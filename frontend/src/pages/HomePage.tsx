import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function HomePage() {
  const { user, logout } = useContext(AuthContext);

  // Якщо дані ще не завантажились
  if (!user) return <div className="p-4">Завантаження...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Вітаю, {user.nickname}!</h1>
      <p className="mb-4">Ваш email: {user.email}</p>
      <p className="mb-4">Роль: {user.role}</p>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Вийти
      </button>
    </div>
  );
}