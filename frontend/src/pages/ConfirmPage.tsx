import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ConfirmPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Confirming...');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setMessage('❌ Invalid or missing token');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    axios
      .get(`/api/auth/confirm?token=${token}`)
      .then(() => setMessage('✅ Email confirmed successfully!'))
      .catch((err) => {
        console.error('Confirmation error:', err);
        setMessage(err.response?.data?.message || '❌ Invalid or expired confirmation token');
      })
      .finally(() => {
        setTimeout(() => navigate('/login'), 1000);
      });
  }, []);

  return (
    <div className="p-6 text-center text-lg font-medium">
      {message}
    </div>
  );
}