import { GraphQLID, GraphQLList } from 'graphql';
import PlayerLevel from './PlayerLevel';
import PlayerLevelType from './type';

const playerlevel = {
  type: new GraphQLList(PlayerLevelType),
  description: 'List of all UserLevel',
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    return PlayerLevel.find(args);
  },
};

export default playerlevel;
