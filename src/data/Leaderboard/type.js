import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

import Player from '../Player/Player';

import PlayerType from '../Player/type';

const LeaderboardType = new GraphQLObjectType({
  name: 'Leaderboard',
  description: 'This represent a Leaderboard',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    score: { type: GraphQLNonNull(GraphQLInt) },
    player: {
      type: PlayerType,
      async resolve({ _id }) {
        return Player.findOne({ _id });
      },
    },
  }),
});

export default LeaderboardType;
