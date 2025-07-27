import { useEffect, useState } from 'react';
import axios from 'axios';

interface DictWord {
  id: string;
  word: string;
  translation: string;
}

export default function DictationPage() {
  const [words, setWords] = useState<DictWord[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get<DictWord[]>('/api/words/dictation');
        setWords(res.data);
      } catch (err: any) {
        console.error('❌ Failed to load dictation words:', err);
        setError(err.response?.data?.message || err.message);
      }
    };
    fetch();
  }, []);

  const handleChange = (id: string, val: string) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleCheck = () => {
    const newResults: Record<string, boolean> = {};
    words.forEach(w => {
      const ans = (answers[w.id] || '').trim().toLowerCase();
      const correct = w.translation.trim().toLowerCase();
      newResults[w.id] = ans === correct;
    });
    setResults(newResults);
  };

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Dictation</h2>
      {words.length === 0 ? (
        <p>No words for dictation.</p>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleCheck();
          }}
        >
          <ul className="space-y-4">
            {words.map(w => (
              <li key={w.id} className="flex items-center space-x-4">
                <span className="font-medium">{w.word}</span>
                <input
                  type="text"
                  value={answers[w.id] || ''}
                  onChange={e => handleChange(w.id, e.target.value)}
                  placeholder="Your translation"
                  className="border p-1 flex-1"
                />
                {results[w.id] != null && (
                  <span className={results[w.id] ? 'text-green-600' : 'text-red-600'}>
                    {results[w.id] ? '✓' : '✗'}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded"
          >
            Check Answers
          </button>
        </form>
      )}
    </div>
  );
}