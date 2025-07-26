import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OAuthSuccessPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rt = params.get('refreshToken');
    if (rt) {
      localStorage.setItem('refreshToken', rt);
      axios.post('/api/auth/refresh', { refreshToken: rt })
        .then(() => {
          navigate('/');
        });
    } else {
      navigate('/login');
    }
  }, []);
  return <div className="p-4">Logging in...</div>;
}