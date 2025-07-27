import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // безопасно получаем длину knownWords
  const learnedCount = user?.knownWords?.length ?? 0;

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">
        👋 Welcome back{user?.nickname ? `, ${user.nickname}` : ''}!
      </h1>

      <p className="text-gray-600 mb-6">
        Let's continue learning today. What would you like to do?
      </p>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Home
        </button>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded"
        >
          🚪 Logout
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <button
          onClick={() => navigate('/repeat')}
          className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded shadow"
        >
          🔁 Repeat Words
        </button>

        <button
          onClick={() => navigate('/dictation')}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded shadow"
        >
          ✍️ Dictation
        </button>

        <button
          onClick={() => navigate('/library')}
          className="bg-green-500 hover:bg-green-600 text-white py-3 rounded shadow"
        >
          📚 Library
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="bg-gray-200 hover:bg-gray-300 text-black py-3 rounded shadow"
        >
          🧑 Profile
        </button>
      </div>

      {learnedCount > 0 && (
        <p className="mt-6 text-sm text-gray-500">
          You have already learned <strong>{learnedCount}</strong> words!
        </p>
      )}
    </div>
  );
};

export default HomePage;