import { storeFB } from '../../utils/upload';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    avatars: (_, args, { models }) => {
      return models.avatar.find(args);
    },
  },
  Mutation: {
    addAvatar: async (_, { title, min_exp, image }, { models }) => {
      const avatar = await models.avatar.create({ title, min_exp });
      let imageid = '';
      if (image) {
        const { filename, createReadStream, mimetype } = await image;
        const stream = createReadStream();
        const filestore: any = await storeFB({ stream, filename, mimetype });
        imageid = filestore.id;
      }
      avatar.imageid = imageid;
      return avatar.save();
    },
  },
};

export default resolvers;
