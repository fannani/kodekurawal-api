import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';

const BadgeType = new GraphQLObjectType({
  name: 'Badge',
  description: 'This represent a Badge',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    imageid: { type: GraphQLString },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default BadgeType;
