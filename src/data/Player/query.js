import { GraphQLID, GraphQLList, GraphQLInt } from 'graphql';
import PlayerType from './type';
import Player from './Player';

const player = {
  type: new GraphQLList(PlayerType),
  description: 'List of all Player',
  args: {
    _id: { type: GraphQLID },
    energy: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    return Player.find(args);
  },
};

export default player;
