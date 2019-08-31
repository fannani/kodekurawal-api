import { merge } from 'lodash'
import Achievement from "./Achievement";
import detailAchievement from './detail/resolvers'
import {storeFB} from "../../utils/upload";

const resolvers = {
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
