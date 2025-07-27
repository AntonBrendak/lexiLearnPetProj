import { useEffect, useState } from 'react';
import axios from 'axios';

interface Word {
  word: string;
  translation: string;
  image?: string;
  transcription?: string;
}

export default function RepeatPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRepeatWords = async () => {
      try {
        const res = await axios.get<Word[]>('/api/words/repeat');
        setWords(res.data);
      } catch (err: any) {
        console.error('❌ Failed to load repeat words:', err);
        // візьмемо з відповіді message або загальний текст
        const message =
          err.response?.data?.message ||
          err.message ||
          'Failed to load repeat words';
        setError(message);
      }
    };

    fetchRepeatWords();
  }, []);

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Words to Repeat</h2>
      {words.length === 0 ? (
        <p>No words to repeat right now.</p>
      ) : (
        <ul className="space-y-2">
          {words.map((w, i) => (
            <li key={i} className="border p-2 rounded">
              <p className="font-semibold">{w.word}</p>
              <p className="text-gray-600">{w.translation}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}