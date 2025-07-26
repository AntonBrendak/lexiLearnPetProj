import { Request, Response } from 'express';
import WordModel from '../models/Word';
import UserModel from '../models/User';
import { generateImage } from '../utils/imageGen';
import { synthesizeSpeech } from '../services/ttsService';
import { AuthRequest } from '../types/AuthRequest';

export class WordsController {
  static async generate(req: AuthRequest, res: Response) {
    console.log('📥 Incoming body:', req.body);
    const { word, lang = 'en' } = req.body;
    try {
      const prompt = `Explain the word "${word}" and give 2 example sentences.`;

      console.log('📌 Запит:', word, 'Мова:', lang);
      let existing = await WordModel.findOne({ text: word, owner: req.user!._id });

      const imageUrl = existing?.imageUrl || await generateImage(word);
      const audioUrl = existing?.audioUrl || await synthesizeSpeech(word, lang, word);

      res.json({ word, imageUrl, audioUrl });
    } catch (err) {
      console.error('❌ Error in WordsController.generate:', err); // ← ОБОВ’ЯЗКОВО
      res.status(500).json({ message: 'Error generating word info' });
    }
  }
}
