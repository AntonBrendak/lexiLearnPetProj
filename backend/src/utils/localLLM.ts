import axios from 'axios';
export async function askLocalLLM(prompt: string) {
  const res = await axios.post('http://localhost:5000/api/generate',{ prompt });
  return res.data.response;
}