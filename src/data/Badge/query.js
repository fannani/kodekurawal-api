import { GraphQLID, GraphQLList } from 'graphql';
import BadgeType from './type';
import Badge from './Badge';

const badges = {
  type: new GraphQLList(BadgeType),
  description: 'List of all badges',
  args: {
    _id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return new Promise((resolve, reject) => {
      Badge.find(args, function(err, badges) {
        err ? reject(err) : resolve(badges);
      });
    });
  },
};
export default badges;
