import { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/auth/request-reset', { email });
      setSent(true);
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Failed to send reset email';
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

      {sent ? (
        <p className="text-green-600">
          If the account exists, a password reset link has been sent to your email.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {error && <div className="text-red-500 mb-2">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send reset link
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;