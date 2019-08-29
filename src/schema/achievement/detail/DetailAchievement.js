import mongoose, { Schema } from 'mongoose';

const DetailAchievementSchema = new Schema({
  achievement: Schema.Types.ObjectId,
  star: Number,
  caption: String,
  target_point: Number,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('DetailAchievement', DetailAchievementSchema);
