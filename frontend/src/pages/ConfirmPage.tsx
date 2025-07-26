import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ConfirmPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token = searchParams.get('token');
    axios.get(`/api/auth/confirm?token=${token}`)
      .then(() => alert('Email confirmed!'))
      .catch(() => alert('Invalid token'))
      .finally(() => navigate('/login'));
  }, []);
  return <div className="p-4">Confirming...</div>;
}