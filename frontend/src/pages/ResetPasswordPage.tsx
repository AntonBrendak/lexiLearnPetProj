import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Invalid or missing token');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('/api/auth/reset-password', {
        token,
        newPassword,
      });

      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000); // Переход через 3 сек
    } catch (err: any) {
      const message = err.response?.data?.message || 'Reset failed';
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Set New Password</h2>

      {success ? (
        <p className="text-green-600">Password successfully reset! Redirecting to login...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            New Password:
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          <label className="block mb-2 mt-2">
            Confirm Password:
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          {error && <div className="text-red-500 mb-2">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
