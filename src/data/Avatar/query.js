import { GraphQLID, GraphQLList } from 'graphql';
import AvatarType from './type';
import Avatar from './Avatar';

const avatars = {
  type: new GraphQLList(AvatarType),
  description: 'List of all avatars',
  args: {
    _id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return new Promise((resolve, reject) => {
      Avatar.find(args, function(err, avatars) {
        err ? reject(err) : resolve(avatars);
      });
    });
  },
};
export default avatars;
