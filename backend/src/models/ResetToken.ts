import { Schema, model, Document, Types } from 'mongoose';

interface IResetToken extends Document {
  user: Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const resetTokenSchema = new Schema<IResetToken>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, index: { expires: 2 * 60 * 1000 } },
});

// индекс { expires: 2 * 60 * 1000 } говорить: видалити документ, коли expiresAt <= now + 2 години
export default model<IResetToken>('ResetToken', resetTokenSchema);