import { Request, Response } from 'express';
import { synthesizeSpeech } from '../services/ttsService';
import UserModel from '../models/User';
import WordModel from '../models/Word';
import { AuthRequest } from '../types/AuthRequest';

export class TTSController {
  static async speak(req: AuthRequest, res: Response) {
    try {
      const { text } = req.body;
      const user = await UserModel.findById(req.user!._id);
      const lang = user?.language || 'en';
      let word = await WordModel.findOne({ text, owner: user!._id });
      if (word?.audioUrl) return res.json({ url: word.audioUrl });
      const filename = `${Date.now()}.wav`;
      const fileUrl = await synthesizeSpeech(text, lang, filename);
      if (word) { word.audioUrl = fileUrl; await word.save(); }
      res.json({ url: fileUrl });
    } catch {
      res.status(500).json({ message: 'TTS error' });
    }
  }
}