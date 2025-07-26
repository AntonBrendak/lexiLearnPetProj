import { Request, Response } from 'express';
import UserModel from '../models/User';
import { AuthRequest } from '../types/AuthRequest';

export class UserController {
  static async getMe(req: AuthRequest, res: Response) {
    const user = await UserModel.findById(req.user!._id);
    res.json({
      nickname: user!.nickname, email: user!.email, role: user!.role,
      language: user!.language, learnedWordsCount: user!.knownWords.length,
      languageLevel: user!.languageLevel, rank: user!.rank
    });
  }
  static async updateLanguage(req: AuthRequest, res: Response) {
    const { language } = req.body;
    await UserModel.findByIdAndUpdate(req.user!._id, { language });
    res.json({ message: 'Language updated' });
  }
}