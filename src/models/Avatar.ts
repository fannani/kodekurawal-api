import mongoose, { Schema } from 'mongoose';

const AvatarSchema = new Schema({
  title: String,
  min_exp: Number,
  imageid: String,
  updated_at: { type: Date, default: Date.now },
});
AvatarSchema.virtual('unlock')
  .get(function() {
    // @ts-ignore
    return this._unlock;
  })
  .set(function(v: any) {
    // @ts-ignore
    this._unlock = v;
  });

export default mongoose.model('Avatar', AvatarSchema);
