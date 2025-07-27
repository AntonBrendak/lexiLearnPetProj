import { Request, Response } from 'express';
import WordModel from '../models/Word';
import { generateImage } from '../utils/imageGen';
import { synthesizeSpeech } from '../services/ttsService';
import { AuthRequest } from '../types/AuthRequest';
import  User from '../models/User';

export const generate = async (req: AuthRequest, res: Response) => {
    console.log('📥 Incoming body:', req.body);
    const { word, lang = 'uk' } = req.body;
    try {
      const prompt = `Explain the word "${word}" and give 2 example sentences.`;

      console.log('📌 Запит:', word, 'Мова:', lang);
      let existing = await WordModel.findOne({ text: word, owner: req.user!._id });

      const imageUrl = existing?.imageUrl || await generateImage(word);
      const audioUrl = existing?.audioUrl || await synthesizeSpeech(word, lang, word);

      res.json({ word, imageUrl, audioUrl });
    } catch (err) {
      console.error('❌ Error in WordsController.generate:', err); 
      res.status(500).json({ message: 'Error generating word info' });
    }
};

export const getRepeatWords = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }
  console.log(req.user);
  const userId = req.user._id;

    const user = await User.findById(userId).populate('knownWords');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Повертаємо перші 10 слів для повторення
    const repeatWords = (user.knownWords as any[]).slice(0, 10).map((word) => ({
      word: word.word,
      translation: word.translation,
      image: word.image || '',
      transcription: word.transcription || ''
    }));

    res.json(repeatWords);
  } catch (err) {
    console.error('❌ Error in getRepeatWords:', err);
    res.status(500).json({ message: 'Failed to fetch repeat words' });
  }
};

export const getDictationWords = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }
    const userId = req.user._id;
    const user = await User.findById(userId).populate('knownWords');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // формируем рандомный список слов для диктанта (до 10 штук)
    const allWords = user.knownWords as any[];
    // если слов меньше 10, берём все, иначе выбираем случайные 10
    const sampleSize = Math.min(allWords.length, 10);
    const dictationWords = [];
    const used = new Set<number>();
    while (dictationWords.length < sampleSize) {
      const idx = Math.floor(Math.random() * allWords.length);
      if (!used.has(idx)) {
        used.add(idx);
        const w = allWords[idx];
        dictationWords.push({
          id: w._id,
          word: w.word,
          translation: w.translation,
        });
      }
    }

    return res.json(dictationWords);
  } catch (err) {
    console.error('❌ Error in getDictationWords:', err);
    return res.status(500).json({ message: 'Failed to fetch dictation words' });
  }
};

export const getLibraryWords = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }
    const userId = req.user!._id;
    const user = await User.findById(userId).populate('knownWords');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // knownWords — это массив документов Word
    const library = (user.knownWords as any[]).map(w => ({
      id: w._id,
      word: w.word,
      translation: w.translation,
      image: w.image || '',
      transcription: w.transcription || ''
    }));

    return res.json(library);
  } catch (err) {
    console.error('❌ Error in getLibraryWords:', err);
    return res.status(500).json({ message: 'Failed to fetch library' });
  }
};