import path from 'path';
import fs from 'fs';
import { generateTTS } from '../utils/tts';

/**
 * Генерує озвучення тексту
 * @param text - текст для озвучення
 * @param lang - мова, наприклад 'en', 'de', 'uk'
 * @param filename - ім’я mp3-файлу без розширення
 * @returns URL до mp3
 */
export async function synthesizeSpeech(text: string, lang: string, filename: string): Promise<string> {
  const safeName = filename.toLowerCase().replace(/[^a-z0-9]/gi, '_');
  const fileName = `${safeName}.mp3`;
  const audioPath = path.join(__dirname, '../../public/audio', fileName);

  if (!fs.existsSync(audioPath)) {
    const audioBuffer = await generateTTS(text, lang);
    fs.mkdirSync(path.dirname(audioPath), { recursive: true });
    fs.writeFileSync(audioPath, audioBuffer);
  }

  return `/audio/${fileName}`;
}