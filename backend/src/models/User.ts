import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  language: { type: String, enum: ['en','uk','ru'], default: 'en' },
  knownWords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }],
  languageLevel: Number, rank: Number,
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  role: { type: String, default: 'user' },

  isConfirmed: { type: Boolean, default: false },
  confirmationToken: { type: String },

  oauthProvider: { type: String, enum: ['google', 'local'], default: 'local' },
  oauthId: { type: String },

  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  settings: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true }
  },
  resetPasswordToken: { type: String, default: '' },
  resetPasswordExpires: { type: Date, default: Date.now, expires: 3600 },
}, { timestamps: true });
export default mongoose.model('User', userSchema);