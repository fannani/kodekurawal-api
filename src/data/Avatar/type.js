import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

const AvatarType = new GraphQLObjectType({
  name: 'Avatar',
  description: 'This represent a Avatar',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    min_exp: { type: GraphQLInt },
    imageid: { type: GraphQLString },
    unlock: { type: GraphQLBoolean },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default AvatarType;
