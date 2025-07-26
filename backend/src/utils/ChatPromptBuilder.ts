import WordModel from '../models/Word';

export async function buildPromptWithStudyWords(userId: string, userMessage: string) {
  const words = await WordModel.find({ owner: userId }).limit(20);
  const list = words.map(w=>w.text).join(', ');
  return `User knows: ${list}. Continue dialog. Message: "${userMessage}"`;
}