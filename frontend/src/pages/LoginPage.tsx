import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(identifier, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const handleGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Email or Nickname" className="w-full p-2 border" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
      </form>
      <button onClick={handleGoogle} className="mt-4 w-full p-2 bg-red-500 text-white rounded">Login with Google</button>
      <p className="mt-4">Don&apos;t have an account? <a href="/register" className="text-blue-600">Register</a></p>
      
      <p className="mt-4">
        Forgot your password?{' '}
        <a href="/forgot-password" className="text-blue-600">Reset it here</a>
      </p>
    </div>
  );
}