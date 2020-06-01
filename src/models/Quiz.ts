import mongoose, { Schema } from 'mongoose';

const QuizSchema = new mongoose.Schema({
  title: String,
  stage: { type: Schema.Types.ObjectId },
  time: Number,
  questions: [
    {
      content: String,
      questionType: String,
      choice: [String],
      answer: String,
      score: Number,
    },
  ],
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Quiz', QuizSchema);
