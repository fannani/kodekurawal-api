import { storeFB } from '../../utils/upload';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Mutation: {
    uploadFile: async (_, { input }, { models }) => {
      if (input.file) {
        const { filename, createReadStream, mimetype } = await input.file;
        const stream = createReadStream();
        const filestore: any = await storeFB({ stream, filename, mimetype });
        const { id } = filestore;
        return models.file.create({ title: input.title, path: id });
      }
      return null;
    },
  },
};

export default resolvers;
