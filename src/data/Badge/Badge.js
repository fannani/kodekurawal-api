import mongoose, { Schema } from 'mongoose';

const BadgeSchema = new Schema({
  title: String,
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Badge', BadgeSchema);
