import mongoose, { Schema } from 'mongoose';

const ScoreSchema = new Schema({
  player: { type: Schema.Types.ObjectId },
  stage: { type: Schema.Types.ObjectId },
  score: Number,
  course: { type: Schema.Types.ObjectId },
  time: Number,
  stars: [Boolean],
  script: String,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Score', ScoreSchema);
