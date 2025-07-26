import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function generateTTS(text: string, lang: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const safeName = text.toLowerCase().replace(/[^a-z0-9]/gi, '_');
    const wavPath = path.join(__dirname, '../../../temp', `${safeName}.wav`);
    const mp3Path = path.join(__dirname, '../../../temp', `${safeName}.mp3`);

    if (!fs.existsSync(path.dirname(wavPath))) {
      fs.mkdirSync(path.dirname(wavPath), { recursive: true });
    }

    const espeakCmd = `espeak -v ${lang} "${text}" --stdout > "${wavPath}"`;
    exec(espeakCmd, (err) => {
      if (err) return reject('eSpeak generation failed: ' + err);

      const ffmpegCmd = `ffmpeg -y -i "${wavPath}" -ar 44100 -ac 2 -b:a 192k "${mp3Path}"`;
      exec(ffmpegCmd, (err2) => {
        if (err2) return reject('ffmpeg conversion failed: ' + err2);

        const buffer = fs.readFileSync(mp3Path);
        fs.unlinkSync(wavPath);
        fs.unlinkSync(mp3Path);

        resolve(buffer);
      });
    });
  });
}