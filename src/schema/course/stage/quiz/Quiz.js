import mongoose, { Schema } from 'mongoose';


const QuizSchema = new mongoose.Schema({
  title: String,
  stage: { type: Schema.Types.ObjectId },
  questions: [ObjectId],
  updated_at: { type: Date, default: Date.now },
});



export default mongoose.model('Quiz', QuizSchema);
