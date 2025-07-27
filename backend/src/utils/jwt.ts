import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

/**
 * Генерує access + refresh токени
 * @param user — об'єкт користувача, де user._id може бути ObjectId
 */
export function generateTokens(user: any) {
  const payload = {
    id: user._id.toString(),  // приводимо ObjectId до рядка
    email: user.email,
    role: user.role
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

  return { accessToken, refreshToken };
}

/**
 * Перевіряє access token
 */
export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

/**
 * Перевіряє refresh token
 */
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}