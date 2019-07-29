import { GraphQLID, GraphQLList } from 'graphql';
import CourseType from './type';
import Course from './Course';

const courses = {
  type: new GraphQLList(CourseType),
  description: 'List of all Course',
  args: {
    _id: { type: GraphQLID },
  },
  resolve: (_, args, context) =>
    // if (!context.user) {
    //   throw new Error('You are not authorized!');
    // }
    new Promise((resolve, reject) => {
      Course.find(args, null, { sort: { updated_at: -1 } }, (err, courses) => {
        err ? reject(err) : resolve(courses);
      });
    }),
};

export default courses;
