import { storeFB, storeFS } from '../../utils/upload';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Course: {
    badge: async (course, args, { models }) => {
      const populated = await models.course
        .findById(course._id)
        .populate('badge');
      return populated.badge;
    },
    stages: (course, args, { models }) => {
      return models.stage.find({ course: course._id }).sort({ index: 1 });
    },
    leaderboard: async (course, args, { models }) => {
      const populated = await models.course.findById(course._id);
      return populated.leaderboard();
    },
  },
  Query: {
    courses: (_, args, { models }) => {
      return models.course.find(args, null, { sort: { index: 1 } });
    },
  },
  Mutation: {
    addCourse: async (_, { name, desc, script, file }, { models }) => {
      let id = '';
      if (file) {
        const { filename, createReadStream, mimetype } = await file;
        const stream = createReadStream();
        const filestore: any = await storeFB({ stream, filename, mimetype });
        id = filestore.id;
      }
      return models.course.create({ name, desc, imageid: id, script });
    },
    updateCourse: async (_, args, { models }) => {
      const edit = await models.course.create.findById(args.id);
      if (args.file) {
        const { filename, createReadStream, mimetype } = await args.file;
        const stream = createReadStream();
        const filestore: any = await storeFB({ stream, filename, mimetype });
        edit.imageid = filestore.id;
      }
      const updated = { ...args };
      delete updated.id;
      delete updated.file;
      edit.set(updated);
      return edit.save();
    },
    deleteCourse: async (_, args, { models }) => {
      const course = await models.course.findByIdAndRemove(args.id);
      return course;
    },
    uploadImage: async (_, { file, courseid }, { models }) => {
      const { createReadStream } = await file;
      const stream = createReadStream();
      const { id }: any = await storeFS({ stream });
      models.course.update({ _id: courseid }, { $set: { imageid: id } });
      return id;
    },
  },
};

export default resolvers;
