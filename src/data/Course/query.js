import { GraphQLID, GraphQLList } from 'graphql';
import CourseType from './type';
import Course from './Course';

const courses = {
  type: new GraphQLList(CourseType),
  description: 'List of all Course',
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(_, args, context) {
    // if (!context.user) {
    //   throw new Error('You are not authorized!');
    // }
    return Course.find(args, null, { sort: { index: 1 } });
  },
};

export default courses;
