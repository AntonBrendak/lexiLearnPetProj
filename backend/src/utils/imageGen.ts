import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function generateImage(prompt: string): Promise<string> {
  const res = await axios.post('http://localhost:8000/sdapi/v1/txt2img',{prompt,steps:20});
  const buffer = Buffer.from(res.data.images[0],'base64');
  const filename = `img_${Date.now()}.png`;
  const out = path.join(__dirname,'../../public/images',filename);
  fs.writeFileSync(out,buffer);
  return `/images/${filename}`;
}