import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import crypto from 'crypto';
import User from '../models/User';
import dotenv from 'dotenv';
import { generateTokens } from './jwt';
dotenv.config(); 

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL!
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0].value!;
      let user = await User.findOne({ oauthProvider: 'google', oauthId: profile.id });

      if (!user) {
        user = await User.create({
          email,
          nickname:      profile.displayName.replace(/\s+/g, '_'),
          password:      crypto.randomBytes(16).toString('hex'),
          oauthProvider: 'google',
          oauthId:       profile.id,
          isConfirmed:   true,
          language:      'en',
          languageLevel: 0,
          rank:          0,
          knownWords:    []
        });
      }

      const tokens = generateTokens(user);
      // Перший аргумент – помилка (null), другий – результат
      done(null, { user, tokens });
    } catch (err) {
      done(err as Error, undefined);
    }
  }
));

passport.serializeUser((obj: any, done) => {
  done(null, obj);    // null – немає помилки, obj – що серіалізуємо
});
passport.deserializeUser((obj: any, done) => {
  done(null, obj);    // null – немає помилки, obj – що десеріалізуємо
});

export default passport;