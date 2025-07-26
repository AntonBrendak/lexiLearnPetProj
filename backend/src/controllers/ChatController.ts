import { Request, Response } from 'express';
import { buildPromptWithStudyWords } from '../utils/ChatPromptBuilder';
import { askLocalLLM } from '../utils/localLLM';
import { AuthRequest } from '../types/AuthRequest';

export class ChatController {
  static async sendMessage(req: AuthRequest, res: Response) {
    const { message } = req.body;
    const userId = req.user!._id;

    try {
      const prompt = await buildPromptWithStudyWords(userId, message);
      const response = await askLocalLLM(prompt);
      res.json({ response });
    } catch (err) {
      res.status(500).json({ message: 'Chat error' });
    }
  }
}