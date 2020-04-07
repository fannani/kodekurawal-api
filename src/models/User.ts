import mongoose, { Schema } from 'mongoose';
import { compare } from 'bcryptjs';

const UserSchema = new Schema({
  email: String,
  role: String,
  hash: String,
  salt: String,
  name: String,
  city: String,
  province: String,
  password: String,
  last_login: Date,
  token_count: { type: Number, default: 1 },
  userdetailid: Schema.Types.ObjectId,
  updated_at: { type: Date, default: Date.now },
});

UserSchema.methods.verifyPassword = function(password: string) {
  return compare(password, this.password);

  // const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  // return this.hash === hash;
};

export default mongoose.model('User', UserSchema);
