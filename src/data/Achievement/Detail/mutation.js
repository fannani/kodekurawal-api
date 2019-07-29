import { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';

import DetailAchievementType from './type';
import DetailAchievement from './DetailAchievement';

const DetailAchievementMutation = {
  addDetailAchievement: {
    type: DetailAchievementType,
    description: 'Add  Achievement',
    args: {
      achievement: { type: new GraphQLNonNull(GraphQLID) },
      star: { type: new GraphQLNonNull(GraphQLInt) },
      caption: { type: new GraphQLNonNull(GraphQLString) },
      target_point: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(root, { achievement, star, caption, target_point }) {
      const detail = new DetailAchievement({
        achievement,
        star,
        caption,
        target_point,
      });
      return detail.save();
    },
  },
};

export default DetailAchievementMutation;
