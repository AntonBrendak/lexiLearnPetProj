import { RequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import User from '../models/User';
import { verifyAccessToken } from '../utils/jwt';
import { AuthRequest } from '../types/AuthRequest';

/**
 * Підключення cookie-parser для роботи з cookie
 */
export function setupAuth(app: any) {
  app.use(cookieParser());
}

/**
 * Middleware для захисту маршрутів та наповнення req.user мінімальними даними
 */
export const authMiddleware: RequestHandler = async (req, res, next) => {
  // Читаємо токен з httpOnly cookie
  const token = req.cookies?.accessToken;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }
  try {
    // Перевіряємо access token
    const payload: any = verifyAccessToken(token);
    const userDoc = await User.findById(payload.id);
    if (!userDoc) {
      return res.status(401).json({ message: 'User not found.' });
    }
    // Приводимо до мінімального об'єкта з рядковим _id
    const authReq = req as AuthRequest;
    authReq.user = {
      _id: userDoc._id.toString(),
      email: userDoc.email,
      role: userDoc.role,
      language: userDoc.language
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired access token.' });
  }
};