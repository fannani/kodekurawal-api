import mongoose, { Schema } from 'mongoose';

const PlayerAchievementSchema = new Schema({
  player: Schema.Types.ObjectId,
  achievement: Schema.Types.ObjectId,
  star: Number,
  point: Number,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('PlayerAchievement', PlayerAchievementSchema);
