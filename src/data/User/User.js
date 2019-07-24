import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: String,
  role: String,
  hash: String,
  salt: String,
  name: String,
  city: String,
  province: String,
  password: String,
  last_login: Date,
  userdetailid: Schema.Types.ObjectId,
  updated_at: { type: Date, default: Date.now },
});

UserSchema.methods.verifyPassword = function(password) {
  return this.password === password;
  // const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  // return this.hash === hash;
};

export default mongoose.model('User', UserSchema);
