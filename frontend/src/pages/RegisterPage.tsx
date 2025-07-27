import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const result = await register(email, nickname, password, 'ua'); // Assuming 'ua' is the default language

  if (result && result.success) {
    alert('Check your email for confirmation link');
    navigate('/login');
  } else {
    alert(result?.message || 'Registration failed');
  }
};


  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border" required />
        <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Nickname" className="w-full p-2 border" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border" required />
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Register</button>
      </form>
      <p className="mt-4">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
    </div>
  );
}
