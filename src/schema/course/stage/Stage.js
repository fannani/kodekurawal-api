import mongoose, { Schema } from 'mongoose';
const Score = mongoose.model("Score");

const StageSchema = new mongoose.Schema({
  title: String,
  index: Number,
  teory: String,
  time: Number,
  exp_reward: Number,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  imageid: String,
  badge_name: String,
  script: String,
  badge_image: String,
  language: String,
  type : { type: String, enum : [' PROGRAMMING','MATERIAL','QUIZ'], default: 'PROGRAMMING' },
  updated_at: { type: Date, default: Date.now },
});

StageSchema.virtual('win')
  .get(function() {
    return this._win;
  })
  .set(function(v) {
    this._win = v;
  });

StageSchema.virtual('stars')
  .get(function() {
    return this._stars;
  })
  .set(function(v) {
    this._stars = v;
  });

StageSchema.virtual('score')
  .get(function() {
    return this._score;
  })
  .set(function(v) {
    this._score = v;
  });

StageSchema.methods.player = async function(player) {
  const stage = await this.model('Stage').findById(this._id);

  let win = false;
  const score = await Score.aggregate([
    {
      $match: {
        stage: mongoose.Types.ObjectId(stage._id),
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
    stage.score = score[0].score;
    stage.stars = score[0].stars;
  }
  stage.win = win;

  return [stage];
};

export default mongoose.model('Stage', StageSchema);
