import { GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';

import AchievementType from './type';
import PlayerAchievement from './PlayerAchievement';
import Player from '../Player';

const PlayerAchievementMutation = {
  addPlayerAchievement: {
    type: AchievementType,
    description: 'Add Player Achievement',
    args: {
      player: { type: new GraphQLNonNull(GraphQLID) },
      achievement: { type: new GraphQLNonNull(GraphQLID) },
      star: { type: new GraphQLNonNull(GraphQLInt) },
      point: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(root, { player, achievement, star, point }) {
      const newachiev = new PlayerAchievement({
        player,
        achievement,
        star,
        point,
      });
      return newachiev.save();
    },
  },
  giveAchievement: {
    type: AchievementType,
    description: 'Give Achievement To Player',
    args: {
      player: { type: new GraphQLNonNull(GraphQLID) },
      achievement: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { player, achievement }) {
      const _player = await Player.findById(player);
      return _player.giveAchievement(achievement);
    },
  },
};

export default PlayerAchievementMutation;
