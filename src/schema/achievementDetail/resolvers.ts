import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Mutation: {
    addDetailAchievement: (
      _,
      { achievement, star, caption, target_point },
      { models }
    ) => {
      return models.detailAchievement.create({
        achievement,
        star,
        caption,
        target_point,
      });
    },
  },
};

export default resolvers;
