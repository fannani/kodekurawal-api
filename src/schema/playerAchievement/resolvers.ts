import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    playerAchievements: (_, args, { models }) => {
      return models.playerAchievement.find(args);
    },
  },
  Mutation: {
    addPlayerAchievement: (
      _,
      { player, achievement, star, point },
      { models }
    ) => {
      return models.playerAchievement.create({
        player,
        achievement,
        star,
        point,
      });
    },
    giveAchievement: async (_, { player, achievement }, { models }) => {
      const _player = await models.player.findById(player);
      return _player.giveAchievement(achievement);
    },
  },
};

export default resolvers;
