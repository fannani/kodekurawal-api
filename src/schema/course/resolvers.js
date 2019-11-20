import {merge} from 'lodash'
import Course from "./Course";
import Stage from "./stage/Stage";
import stage from './stage/resolvers';
import {storeFB} from "../../utils/upload";

const resolvers = {
  Course : {
    badge: async (course) => {
      const populated = await Course.findById(course._id).populate('badge');
      return populated.badge;
    },
    stages: (course) => {
      return Stage.find({ course: course._id }).sort({ index: 1 });
    },
    leaderboard: async (course) => {
      let populated = await Course.findById(course._id);
      return populated.leaderboard();

    },
  },
  Query: {
    courses: (_, args) => {
      return Course.find(args, null, { sort: { index: 1 } });    },
  },
  Mutation: {
    addCourse: async(_,{name , desc, script, file}) => {
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
    updateCourse: async(_,args) => {
      const edit = await Course.findById(args.id);
      if (file) {
        const { filename, createReadStream, mimetype } = await args.file;
        const stream = createReadStream();
        const filestore = await storeFB({ stream, filename, mimetype });
        edit.imageid = filestore.id;
      }
      delete args.id;
      delete args.file;
      edit.set(args);

      return edit.save();
    },
    deleteCourse: async(_,args) => {
      const course = await Course.findByIdAndRemove(args.id);
      return course;
    },
    uploadImage: async(_,args) => {
      const { filename, mimetype, createReadStream } = await file;
      const stream = createReadStream();
      const { id, path } = await storeFS({ stream, filename });
      Course.update({ _id: courseid }, { $set: { imageid: id } });
      return id;
    },
  }

};

export default merge(resolvers,stage);
