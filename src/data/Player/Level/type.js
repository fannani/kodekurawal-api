import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const PlayerLevelType = new GraphQLObjectType({
  name: 'PlayerLevel',
  description: 'This represent a UserLevel',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    level: { type: GraphQLNonNull(GraphQLInt) },
    exp_req: { type: GraphQLNonNull(GraphQLInt) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default PlayerLevelType;
