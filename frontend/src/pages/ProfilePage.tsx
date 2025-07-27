import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [language, setLanguage] = useState(user?.language || 'en');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  if (!user) {
    return <p className="p-4 text-center">You need to be logged in to see this page.</p>;
  }

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setLoading(true);
    try {
      await axios.patch('/api/user/language', { language: newLang });
      setMessage('Language updated!');
    } catch (err: any) {
      console.error('❌ Failed to update language', err);
      setMessage(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 px-4 py-14">
      <Card className="w-full max-w-xl">
        <div className="flex flex-col items-center gap-2 mb-6">
          {/* Аватар */}
          <div className="relative">
            <span className="block w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-5xl shadow-lg">
              👤
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight text-center mb-1">Your Profile</h1>
          <span className="text-sm text-gray-400">Personal settings and statistics</span>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <Input value={user.email} disabled />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nickname</label>
            <Input value={user.nickname} disabled />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Language</label>
            <Select value={language} onChange={handleLanguageChange} disabled={loading}>
              <option value="en">English</option>
              <option value="ua">Українська</option>
              <option value="ru">Русский</option>
            </Select>
            {message && <p className="text-green-600 text-sm mt-1">{message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Level &amp; Rank</label>
            <div className="flex gap-3 items-center mt-2">
              <span className="bg-green-100 text-green-700 rounded-xl px-3 py-1 text-sm font-semibold">
                Level: {user.languageLevel}
              </span>
              <span className="bg-blue-100 text-blue-700 rounded-xl px-3 py-1 text-sm font-semibold">
                Rank: {user.rank}
              </span>
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-8"
          color="red"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          🚪 Logout
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
