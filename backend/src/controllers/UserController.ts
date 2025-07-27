import { Request, Response } from 'express';
import UserModel from '../models/User';
import { AuthRequest } from '../types/AuthRequest';

export class UserController {
  static async getMe(req: AuthRequest, res: Response) {
  const user = await UserModel.findById(req.user!._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({
    user: {
      _id: user._id.toString(),
      email: user.email,
      nickname: user.nickname,       
      role: user.role,
      language: user.language,
      knownWords: user.knownWords,   
      learnedWordsCount: user.knownWords.length,
      languageLevel: user.languageLevel,
      rank: user.rank,
      avatarUrl: user.avatarUrl      
    }
  });
}
  static async updateLanguage(req: AuthRequest, res: Response) {
    const { language } = req.body;
    await UserModel.findByIdAndUpdate(req.user!._id, { language });
    res.json({ message: 'Language updated' });
  }
}