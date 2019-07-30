import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  videoid: String,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Video', VideoSchema);
