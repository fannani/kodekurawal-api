import mongoose from 'mongoose';

const TestCaseSchema = new mongoose.Schema({
  caption: String,
  script: String,
});

export default mongoose.model('TestCase', TestCaseSchema);
