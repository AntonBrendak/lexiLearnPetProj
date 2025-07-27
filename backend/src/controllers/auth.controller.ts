import { Request, Response, CookieOptions } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';
import { sendConfirmationEmail, sendResetPasswordEmail } from '../utils/sendEmail';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import { AuthRequest } from '../types/AuthRequest';
import ResetToken from '../models/ResetToken';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, nickname, password, language = 'uk' } = req.body;

    console.log('📩 Incoming registration for:', email, nickname);

    const emailExists = await User.findOne({ email });
    const nickExists = await User.findOne({ nickname });

    if (emailExists || nickExists) {
      const message = emailExists
        ? 'Email already exists'
        : 'Nickname already exists';

      console.warn('⚠️ Duplicate found:', message);
      return res.status(400).json({ message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    const newUser = await User.create({
      email,
      nickname,
      password: hashedPassword,
      language,
      languageLevel: 0,
      rank: 0,
      knownWords: [],
      confirmationToken,
      isConfirmed: false,
    });

    console.log('✅ User created:', newUser.email);
    await sendConfirmationEmail(email, confirmationToken);

    return res
      .status(201)
      .json({ message: 'Check your email to confirm registration.' });
  } catch (err: any) {
    console.error('❌ Registration error:', err.message || err);
    return res.status(500).json({
      message: 'Registration failed. Please try again later.',
    });
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    if (!token) {
      return res.status(400).json({ message: 'Confirmation token is required.' });
    }
    const user = await User.findOne({ confirmationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired confirmation token.' });
    }
    user.isConfirmed        = true;
    user.confirmationToken  = undefined;
    await user.save();
    res.status(200).json({ message: 'Email confirmed successfully.' });
  } catch (err) {
    console.error('❌ Confirmation error:', err);
    res.status(500).json({ message: 'Confirmation failed.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;  
    // identifier = email або nickname
    const user = await User.findOne({
      $or: [{ email: identifier }, { nickname: identifier }]
    });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }
    if (!user.isConfirmed) {
      return res.status(400).json({ message: 'Please confirm your email.' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    // Короткий токен в httpOnly cookie
   const cookieOpts: CookieOptions = {
      httpOnly: true,
      maxAge: 2 * 60 * 1000 * 60,  // 2 години
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure:   process.env.NODE_ENV === 'production'
    };

    res.cookie('accessToken', accessToken, cookieOpts);
    // Довгий токен віддаємо у body
    res.json({ refreshToken });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Login failed.' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required.' });
    }
    let payload: any;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      return res.status(400).json({ message: 'Invalid refresh token.' });
    }
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const tokens = generateTokens(user);
   const cookieOpts: CookieOptions = {
      httpOnly: true,
      maxAge: 2 * 60 * 1000 * 60,  // 2 години
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure:   process.env.NODE_ENV === 'production'
    };

    res.cookie('accessToken', tokens.accessToken, cookieOpts);
    res.json({ refreshToken: tokens.refreshToken });
  } catch (err) {
    console.error('❌ Refresh error:', err);
    res.status(500).json({ message: 'Could not refresh token.' });
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?._id);
  res.json({ user: user });
};


export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email });

  if (!user) {
    console.warn(`🔍 Запит на скидання пароля: користувача ${email} не знайдено`);
    return res.status(200).json({ message: 'If account exists, email was sent' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expire = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2 години

  await ResetToken.deleteMany({ user: user._id });
  await user.save();
  console.log(`📧 Надсилання листа для скидання пароля на ${email}`)  ;
  await sendResetPasswordEmail(email, token);

  return res.status(200).json({ message: 'Reset email sent if account exists' });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }
  const UserToken = await ResetToken.findOne({ token });
  const user = await User.findById({ UserToken });


  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await ResetToken.deleteMany({ user: user._id });
  user.isConfirmed = true;

  await user.save();

  return res.status(200).json({ message: 'Password successfully reset' });
};