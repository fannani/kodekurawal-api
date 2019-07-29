import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import CourseType from './type';
import Course from './Course';
import { storeFB } from '../../utils/upload';
import Stage from './Stage/Stage';

const CourseMutation = {
  addCourse: {
    type: CourseType,
    description: 'Add Course',
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      desc: { type: GraphQLNonNull(GraphQLString) },
      script: { type: GraphQLString },
      file: {
        description: 'Image file.',
        type: GraphQLUpload,
      },
    },
    async resolve(root, { file, name, desc, script }) {
      let id = '';
      if (file) {
        const { filename, createReadStream, mimetype } = await file;
        const stream = createReadStream();
        const filestore = await storeFB({ stream, filename, mimetype });
        id = filestore.id;
      }
      const course = new Course({ name, desc, imageid: id, script });
      const newcourse = await course.save();
      return newcourse;
    },
  },

  updateCourse: {
    type: CourseType,
    description: 'Update Course',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      desc: { type: GraphQLString },
      script: { type: GraphQLString },
    },
    async resolve(root, args) {
      const edit = await Course.findById(args.id);
      delete args.id;
      edit.set(args);
      return edit.save();
    },
  },
  deleteCourse: {
    type: CourseType,
    description: 'Delete Course',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, args) {
      const course = await Course.findByIdAndRemove(args.id);
      return course;
    },
  },
  uploadImage: {
    description: 'Uploads an image.',
    type: GraphQLString,
    args: {
      courseid: { type: GraphQLID },
      file: {
        description: 'Image file.',
        type: GraphQLUpload,
      },
    },
    async resolve(parent, { file, courseid }) {
      const { filename, mimetype, createReadStream } = await file;
      const stream = createReadStream();
      const { id, path } = await storeFS({ stream, filename });
      Course.update({ _id: courseid }, { $set: { imageid: id } });
      return id;
    },
  },
};

export default CourseMutation;
