import Avatar from "../../models/Avatar";
import {storeFB} from "../../utils/upload";

const resolvers = {
  Query: {
    avatars: (_, args) => {
      return Avatar.find(args)
    },
  },
  Mutation: {
    addAvatar: async(_,{ title, min_exp, image }) => {
      const avatar = new Avatar({ title, min_exp });
      let imageid = '';
      if (image) {
        const { filename, createReadStream, mimetype } = await image;
        const stream = createReadStream();
        const filestore = await storeFB({ stream, filename, mimetype });
        imageid = filestore.id;
      }
      avatar.imageid = imageid;
      return avatar.save();
    }
  }

};

export default resolvers;
