import mongoose, { Schema } from 'mongoose';
import Score from '../Course/Stage/Score/Score';
import Course from '../Course/Course';
import PlayerLevel from './Level/PlayerLevel';
import PlayerAchievement from './Achievement/PlayerAchievement';
import DetailAchievement from '../Achievement/Detail/DetailAchievement';
import Achievement from '../Achievement/Achievement';
import Avatar from '../Avatar/Avatar';

const PlayerSchema = new Schema({
  energy: { type: Number, default: 0 },
  birthday: Date,
  exp: { type: Number, default: 0 },
  energy_time: Date,
  daily_exp: { type: Number, default: 0 },
  daily_exp_date: { type: Date, default: Date.now },
  daily_login: Date,
  badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
  friends: [Schema.Types.ObjectId],
  updated_at: { type: Date, default: Date.now },
  tutorial: [{ type: Boolean, default: true }],
  avatar: {
    type: Schema.Types.ObjectId,
    ref: 'Avatar',
    default: mongoose.Types.ObjectId('5ccdd80648a1e1147c77bddc'),
  },
});

PlayerSchema.methods.scores = async function() {
  const score = await Score.aggregate([
    { $match: { player: this._id } },
    {
      $group: {
        _id: '$stage',
        score: { $max: '$score' },
        course: { $first: '$course' },
      },
    },
  ]);
  return score;
};

PlayerSchema.methods.totalAchievement = async function() {
  const achiev = await PlayerAchievement.aggregate([
    { $match: { player: this._id } },
    {
      $group: {
        _id: '$player',
        total: { $sum: '$star' },
      },
    },
  ]);
  return achiev[0].total;
};

PlayerSchema.methods.resetAchievement = async function(achievement) {
  const playerAchiev = await PlayerAchievement.findOne({
    player: this._id,
    achievement,
  });

  playerAchiev.point = 0;
  return playerAchiev.save();
};

PlayerSchema.methods.giveAchievement = async function(achievement) {
  const playerAchiev = await PlayerAchievement.findOne({
    player: this._id,
    achievement,
  });
  const allDetail = await DetailAchievement.find({ achievement });
  const achiev = await Achievement.findById(achievement);

  if (playerAchiev) {
    const detail = await DetailAchievement.findOne({
      achievement,
      star: playerAchiev.star + 1,
    });
    if (playerAchiev.point < detail.target_point - 1) {
      playerAchiev.point += 1; //TODO: Fixing if target 1
    } else if (playerAchiev.star < allDetail.length) {
      playerAchiev.star += 1;
      if (!achiev.continuous) {
        playerAchiev.point = 0;
      }
    }
    return playerAchiev.save();
  }
  const newachiev = new PlayerAchievement({
    player: this._id,
    achievement,
    star: 0,
    point: 1,
  });
  return newachiev.save();
};

PlayerSchema.methods.courseScore = async function() {
  const score = await Score.aggregate([
    { $match: { player: this._id } },
    {
      $group: {
        _id: '$stage',
        score: { $max: '$score' },
        course: { $first: '$course' },
      },
    },
    {
      $group: {
        _id: '$course',
        score: { $max: '$score' },
      },
    },
  ]);
  return score;
};

PlayerSchema.methods.level = async function() {
  const playerlevel = await PlayerLevel.find({
    exp_req: { $lt: this.exp },
  })
    .sort({ level: -1 })
    .limit(1);
  if (playerlevel.length) {
    return playerlevel[0].level;
  }
  return 1;
};

PlayerSchema.methods.targetExp = async function() {
  const playerlevel = await PlayerLevel.find({
    exp_req: { $gt: this.exp },
  })
    .sort({ level: 1 })
    .limit(1);
  return playerlevel[0].exp_req;
};

PlayerSchema.methods.getCourse = async function() {
  const score = await Score.aggregate([
    { $match: { player: this._id } },
    {
      $group: {
        _id: '$course',
      },
    },
  ]);
  let temp = [];
  for (let i = 0; i < score.length; i++) {
    temp.push(score[i]._id);
  }
  let courses = await Course.find({
    _id: { $in: temp },
  });
  return courses;
};

export default mongoose.model('Player', PlayerSchema);
