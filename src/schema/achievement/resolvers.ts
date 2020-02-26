import { storeFB } from '../../utils/upload';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Achievement: {
    detail: async ({ _id }, args, { models }) => {
      return models.detailAchievement.find({ achievement: _id });
    },
  },
  Query: {
    achievements: async (_, args, { models }) => {
      if (args.player) {
        const achievements = await models.achievement.find();
        for (let i = 0; i < achievements.length; i++) {
          achievements[i] = achievements[i].player(args.player);
        }
        return achievements;
      }
      return models.achievement.find(args);
    },
  },
  Mutation: {
    addAchievement: async (_, { title, continuous, file }, { models }) => {
      let id = '';
      if (file) {
        const { filename, createReadStream } = await file;
        const stream = createReadStream();
        const filestore: any = await storeFB({ stream, filename });
        id = filestore.id;
      }

      return models.achievement.create({
        title,
        continuous,
        imageid: id,
      });
    },
  },
};

export default resolvers;
