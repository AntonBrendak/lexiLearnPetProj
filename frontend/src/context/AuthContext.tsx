import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  nickname: string;
  role: string;
  language: string;
}

interface AuthContextProps {
  user: User | null;
  login: (identifier: string, password: string) => Promise<void>;
  register: (email: string, nickname: string, password: string, language: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    (async () => {
      const rt = localStorage.getItem('refreshToken');
      if (rt) {
        try {
          await axios.post('/api/auth/refresh', { refreshToken: rt });
          const res = await axios.get('/api/auth/me');
          setUser(res.data.user);
        } catch {
          localStorage.removeItem('refreshToken');
          setUser(null);
        }
      }
    })();
  }, []);

  const login = async (identifier: string, password: string) => {
    const res = await axios.post('/api/auth/login', { identifier, password });
    localStorage.setItem('refreshToken', res.data.refreshToken);
    const meRes = await axios.get('/api/auth/me');
    setUser(meRes.data.user);
  };

    const register = async (email: string, nickname: string, password: string, language: string) => {
    try {
      await axios.post('/api/auth/register', { email, nickname, password, language });
      return { success: true };
    } catch (err: any) {
      // Extract meaningful message if available
      const message = err.response?.data?.message || err.message;
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}