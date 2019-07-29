import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphQLUpload } from 'graphql-upload/lib';

import AvatarType from './type';
import Avatar from './Avatar';

import { storeFB } from '../../utils/upload';

const AvatarMutation = {
  addAvatar: {
    type: AvatarType,
    description: 'Add Avatar',
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      min_exp: { type: GraphQLInt },
      image: { type: GraphQLUpload },
    },
    async resolve(root, { title, min_exp, image }) {
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
    },
  },
};

export default AvatarMutation;
