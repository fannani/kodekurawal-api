import { GraphQLID, GraphQLList, GraphQLInt } from 'graphql';
import AchievementType from './type';
import Achievement from './Achievement';

const achievement = {
  type: new GraphQLList(AchievementType),
  description: 'List of all Player',
  args: {
    _id: { type: GraphQLID },
    player: {
      type: GraphQLID,
    },
  },
  async resolve(parent, args) {
    if (args.player) {
      let achievements = await Achievement.find();
      for (let i = 0; i < achievements.length; i++) {
        achievements[i] = achievements[i].player(args.player);
      }
      return achievements;
    }
    return Achievement.find(args);
  },
};

export default achievement;
