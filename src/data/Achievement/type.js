import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import AchievementDetailType from './Detail/type';
import DetailAchievement from './Detail/DetailAchievement';

const AchievementType = new GraphQLObjectType({
  name: 'Achievement',
  description: 'This represent an course',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    continuous: { type: GraphQLNonNull(GraphQLBoolean) },
    caption: { type: GraphQLString },
    star: { type: GraphQLInt },
    target_point: { type: GraphQLInt },
    point: { type: GraphQLInt },
    detail: {
      type: GraphQLList(AchievementDetailType),
      async resolve({ _id }) {
        return DetailAchievement.find({ achievement: _id });
      },
    },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default AchievementType;
