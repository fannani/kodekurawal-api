import mongoose, { Schema } from 'mongoose';

const MaterialSchema = new mongoose.Schema({
  stage: { type: Schema.Types.ObjectId },
  body: String,
  url: String,
  materialType: { type: String, enum : ['PDF','WEB'], default: 'WEB' },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Material', MaterialSchema);
