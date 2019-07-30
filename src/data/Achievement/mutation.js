import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';

import AchievementType from './type';
import Achievement from './Achievement';
import { storeFB } from '../../utils/upload';

const AchievementMutation = {
  addAchievement: {
    type: AchievementType,
    description: 'Add  Achievement',
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      continuous: { type: new GraphQLNonNull(GraphQLBoolean) },
      file: {
        description: 'Image file.',
        type: GraphQLUpload,
      },
    },
    async resolve(root, { title, continuous, file }) {
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
    },
  },
};

export default AchievementMutation;
