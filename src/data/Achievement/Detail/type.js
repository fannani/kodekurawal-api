import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

const AchievementDetailType = new GraphQLObjectType({
  name: 'AchievementDetail',
  description: 'This represent an AchievementDetail',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    achievement: { type: GraphQLID },
    star: { type: GraphQLNonNull(GraphQLInt) },
    caption: { type: GraphQLNonNull(GraphQLString) },
    target_point: { type: GraphQLNonNull(GraphQLInt) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default AchievementDetailType;
