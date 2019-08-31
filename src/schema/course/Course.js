import mongoose, { Schema } from 'mongoose';
import Score from '../course/stage/score/Score'
import Stage from '../course/stage/Stage'

const CourseSchema = new mongoose.Schema({
  index: { type: Number, default: 1 },
  name: String,
  desc: String,
  script: String,
  imageid: String,
  badge: { type: Schema.Types.ObjectId, ref: 'Badge' },
  updated_at: { type: Date, default: Date.now },
});

CourseSchema.methods.leaderboard = async function() {
  const score = await Score.aggregate([
    { $match: { course: this._id } },
    {
      $group: {
        _id: {
          stage: '$stage',
          player: '$player',
        },
        score: { $max: '$score' },
        player: { $first: '$player' },
      },
    },
    { $group: { _id: '$player', score: { $sum: '$score' } } },
    { $sort: { score: -1 } },
    { $limit: 10 },
  ]);
  return score;
};

CourseSchema.methods.player = async function(player) {
  let stage = await Stage.find({ course: this._id }).sort({ index: 1 });
  for (let i = 0; i < stage.length; i += 1) {
    let win = false;
    const score = await Score.aggregate([
      {
        $match: {
          stage: mongoose.Types.ObjectId(stage[i]._id),
          player: mongoose.Types.ObjectId(player),
        },
      },
      {
        $group: {
          _id: { stage: '$stage' },
          score: { $max: '$score' },
          stars: { $first: '$stars' },
        },
      },
    ]);
    if (score.length > 0 && score[0].score > 0) {
      win = true;
      stage[i].score = score[0].score;
      stage[i].stars = score[0].stars;
    }
    stage[i].win = win;
  }
  return stage;
};

export default mongoose.model('Course', CourseSchema);
