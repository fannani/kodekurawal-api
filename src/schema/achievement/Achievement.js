import mongoose, { Schema } from 'mongoose';
import DetailAchievement from '../achievement/detail/DetailAchievement'
import PlayerAchievement from '../player/achievement/PlayerAchievement'

const AchievementSchema = new Schema({
  title: String,
  continuous: Boolean,
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});

AchievementSchema.virtual('caption')
  .get(function() {
    return this._caption;
  })
  .set(function(v) {
    this._caption = v;
  });

AchievementSchema.virtual('star')
  .get(function() {
    return this._star;
  })
  .set(function(v) {
    this._star = v;
  });

AchievementSchema.virtual('target_point')
  .get(function() {
    return this._target_point;
  })
  .set(function(v) {
    this._target_point = v;
  });

AchievementSchema.virtual('point')
  .get(function() {
    return this._point;
  })
  .set(function(v) {
    this._point = v;
  });

AchievementSchema.methods.player = async function(player) {
  const achiev = await PlayerAchievement.findOne({
    achievement: this._id,
    player,
  });
  let detail;
  if (achiev) {
    detail = await DetailAchievement.findOne({
      achievement: this._id,
      star: achiev.star + 1,
    });
  } else {
    detail = await DetailAchievement.findOne({
      achievement: this._id,
      star: 1,
    });
  }
  if (detail) {
    this.star = achiev ? achiev.star : 0;
    this.point = achiev ? achiev.point : 0;
    this.target_point = detail.target_point;
    this.caption = detail.caption;
  }
  return this;
};

export default mongoose.model('Achievement', AchievementSchema);
