import mongoose, { Schema } from 'mongoose';
import DetailAchievement from './DetailAchievement';
import PlayerAchievement from './PlayerAchievement';

const AchievementSchema = new Schema({
  title: String,
  continuous: Boolean,
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});

AchievementSchema.virtual('caption')
  .get(function() {
    // @ts-ignore
    return this._caption;
  })
  .set(function(v: any) {
    // @ts-ignore
    this._caption = v;
  });

AchievementSchema.virtual('star')
  .get(function() {
    // @ts-ignore
    return this._star;
  })
  .set(function(v: string) {
    // @ts-ignore
    this._star = v;
  });

AchievementSchema.virtual('target_point')
  .get(function() {
    // @ts-ignore
    return this._target_point;
  })
  .set(function(v: any) {
    // @ts-ignore
    this._target_point = v;
  });

AchievementSchema.virtual('point')
  .get(function() {
    // @ts-ignore
    return this._point;
  })
  .set(function(v: any) {
    // @ts-ignore
    this._point = v;
  });

AchievementSchema.methods.player = async function(player: any) {
  const achiev: any = await PlayerAchievement.findOne({
    achievement: this._id,
    player,
  });
  let detail: any;
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
