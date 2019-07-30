import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID, GraphQLInt,
} from 'graphql';
import StageType from './Stage/type';
import Stage from './Stage/Stage';
import Course from './Course';
import LeaderboardType from '../Leaderboard/type';
import BadgeType from '../Badge/type';

const CourseType = new GraphQLObjectType({
  name: 'Course',
  description: 'This represent an course',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    index: { type: GraphQLInt },
    script: { type: GraphQLString },
    desc: { type: GraphQLNonNull(GraphQLString) },
    imageid: { type: GraphQLString },
    badge: {
      type: BadgeType,
      async resolve({ _id }) {
        const course = await Course.findById(_id).populate('badge');
        return course.badge;
      },
    },
    stages: {
      type: GraphQLList(StageType),
      async resolve({ _id }) {
        return Stage.find({ course: _id }).sort({ index: 1 });
      },
    },
    leaderboard: {
      type: GraphQLList(LeaderboardType),
      async resolve({ _id }) {
        let course = await Course.findById(_id);
        return course.leaderboard();
      },
    },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default CourseType;
