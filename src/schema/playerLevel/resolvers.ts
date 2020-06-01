import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    playerLevel: (_, args, { models }) => {
      return models.playerLevel.find(args);
    },
  },
  Mutation: {
    addPlayerLevel: (_, { level, exp_req }, { models }) => {
      return models.playerLevel.create({
        level,
        exp_req,
      });
    },
  },
};

export default resolvers;
