import { storeFB } from '../../utils/upload';
import File from '../../models/File';


const resolvers = {
  Mutation: {
    uploadFile: async (_, { input }) => {
      if (input.file) {
        const {filename, createReadStream, mimetype } = await input.file;
        const stream = createReadStream();
        const filestore = await storeFB({ stream, filename,mimetype });
        const { path, id } = filestore;
        const file = new File({ title:input.title, path: id});
        await file.save();
        return file;
      }
    },

  },
};



export default resolvers;
