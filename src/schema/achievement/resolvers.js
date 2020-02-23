import { merge } from 'lodash'
import Achievement from "../../models/Achievement";
import DetailAchievement from "../../models/DetailAchievement";
import detailAchievement from '../achievementDetail/resolvers'
import {storeFB} from "../../utils/upload";

const resolvers = {
  Achievement: {
	detail: async ({ _id }) => {
      return DetailAchievement.find({ achievement: _id });
    },
  },
  Query: {
    achievements: async (_, args) => {
      if (args.player) {
        let achievements = await Achievement.find();
        for (let i = 0; i < achievements.length; i++) {
          achievements[i] = achievements[i].player(args.player);
        }
        return achievements;
      }
      return Achievement.find(args);
    },
  },
  Mutation: {
    addAchievement: async (_,{ title, continuous, file }) => {
      let id = '';
      if (file) {
        const { filename, createReadStream } = await file;
        const stream = createReadStream();
        const filestore = await storeFB({ stream, filename });
        id = filestore.id;
      }

      const newachiev = new Achievement({
        title,
        continuous,
        imageid: id,
      });
      return newachiev.save();
    }
  }

};

export default merge(resolvers,detailAchievement);
