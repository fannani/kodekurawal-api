import mongoose, { Schema } from 'mongoose';

const TestCaseMissionSchema = new mongoose.Schema({
  mission: { type: Schema.Types.ObjectId, ref: 'Mission' },
  testcase: { type: Schema.Types.ObjectId, ref: 'TestCase'},
  params: [String],
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('TestCaseMission', TestCaseMissionSchema);
