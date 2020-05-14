import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  title: String,
  path: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('File', FileSchema);
