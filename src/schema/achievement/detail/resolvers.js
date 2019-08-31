
import DetailAchievement from "DetailAchievement";

const resolvers = {
  Mutation: {
    addDetailAchievement: (_, { achievement, star, caption, target_point }) => {
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

export default resolvers;
