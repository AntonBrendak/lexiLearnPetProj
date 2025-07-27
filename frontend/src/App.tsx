import './index.css';
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ConfirmPage,
  ProfilePage,
  LibraryPage,
  RepeatPage,
  DictationPage,
  TodayPage
} from './pages';
import ProtectedRoute from './components/ProtectedRoutes';

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>  {/* Auth routes when no user */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/confirm" element={<ConfirmPage />} />
          </>
        ) : (
          <>  {/* Protected routes when logged in */}
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
              <Route path="/repeat" element={<ProtectedRoute><RepeatPage /></ProtectedRoute>} />
              <Route path="/dictation" element={<ProtectedRoute><DictationPage /></ProtectedRoute>} />
              <Route path="/today" element={<ProtectedRoute><TodayPage /></ProtectedRoute>} />
            {/* інші захищені маршрути тут */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
