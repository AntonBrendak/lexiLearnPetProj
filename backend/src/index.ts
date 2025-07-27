import express, { RequestHandler } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from './utils/passport';

import { setupAuth, authMiddleware } from './middleware/auth.middleware';
import {
  register,
  confirmEmail,
  login,
  refreshToken,
  me,
  requestPasswordReset,
  resetPassword
} from './controllers/auth.controller';
import { generate, getRepeatWords, getDictationWords, getLibraryWords } from './controllers/WordsController';
import { ChatController }  from './controllers/ChatController';
import { TTSController }   from './controllers/TTSController';
import { UserController }  from './controllers/UserController';

dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// ———————————————————————————————
// Basic middleware
// ———————————————————————————————
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET!,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
setupAuth(app); // додає cookieParser для authMiddleware

// ———————————————————————————————
// MongoDB
// ———————————————————————————————
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ———————————————————————————————
// Auth routes
// ———————————————————————————————
app.post   ('/api/auth/register', register as RequestHandler);
app.get    ('/api/auth/confirm',  confirmEmail as RequestHandler);
app.post   ('/api/auth/login',    login as RequestHandler);
app.post   ('/api/auth/refresh',  refreshToken as RequestHandler);
app.get    ('/api/auth/me',       authMiddleware, me as RequestHandler);
app.post   ('/api/auth/reset-password',resetPassword as RequestHandler);
app.post   ('/api/auth/request-reset', requestPasswordReset as RequestHandler);

// Google OAuth
app.get    ('/api/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] })
);
app.get    ('/api/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // витягнуті в auth.controller запис токенів
    const { tokens } = (req.user as any);
    res.cookie('accessToken', tokens.at, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    res.redirect(`http://localhost:5173/oauth-success?refreshToken=${tokens.rt}`);
  }
);

// ———————————————————————————————
// Protected API routes
// ———————————————————————————————
app.post   ('/api/words/generate',             authMiddleware, generate as RequestHandler);
app.post   ('/api/dialogue',                   authMiddleware, ChatController.sendMessage as RequestHandler);
app.post   ('/api/tts',                        authMiddleware, TTSController.speak as RequestHandler);
app.get    ('/api/user/profile',               authMiddleware, UserController.getMe as RequestHandler);
app.get    ('/api/words/library',               authMiddleware, getLibraryWords as RequestHandler);
app.get    ('/api/words/repeat',         authMiddleware, getRepeatWords as RequestHandler);
app.get    ('/api/words/dictation',     authMiddleware, getDictationWords as RequestHandler);

app.patch  ('/api/user/language',              authMiddleware, UserController.updateLanguage as RequestHandler);

// ———————————————————————————————
// Start server
// ———————————————————————————————
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});