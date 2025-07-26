import mongoose from 'mongoose';
const wordSchema = new mongoose.Schema({
  text: { type: String, required: true },
  explanation: String,
  examples: [String],
  imageUrl: String,
  audioUrl: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
export default mongoose.model('Word', wordSchema);