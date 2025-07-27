import { useEffect, useState } from 'react';
import axios from 'axios';

interface LibraryWord {
  id: string;
  word: string;
  translation: string;
  image?: string;
  transcription?: string;
}

export default function LibraryPage() {
  const [words, setWords] = useState<LibraryWord[]>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await axios.get<LibraryWord[]>('/api/words/library');
        setWords(res.data);
      } catch (err: any) {
        console.error('❌ Failed to load library:', err);
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchLibrary();
  }, []);

  // Фильтруем слова по подстроке из filter
  const displayed = words.filter(w =>
    w.word.toLowerCase().includes(filter.toLowerCase()) ||
    w.translation.toLowerCase().includes(filter.toLowerCase())
  );

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📚 Library</h2>

      <input
        type="text"
        placeholder="Search words..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      {displayed.length === 0 ? (
        <p className="text-gray-600">No words found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayed.map(w => (
            <li
              key={w.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <p className="text-xl font-semibold">{w.word}</p>
              <p className="text-gray-700 mb-2">{w.translation}</p>
              {w.transcription && (
                <p className="text-sm text-gray-500 mb-2">
                  [{w.transcription}]
                </p>
              )}
              {w.image && (
                <img
                  src={w.image}
                  alt={w.word}
                  className="w-full h-32 object-cover rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}