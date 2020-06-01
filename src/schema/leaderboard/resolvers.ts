import Player from '../../models/Player';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Leaderboard: {
    player: ({ _id }, args, { models }) => {
      return models.player.findOne({ _id });
    },
  },
};

export default resolvers;
