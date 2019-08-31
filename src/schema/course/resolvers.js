import {merge} from 'lodash'
import Course from "./Course";
import stage from './stage/resolvers';
import {storeFB} from "../../utils/upload";

const resolvers = {
  Query: {
    courses: (_, args) => {
      return Course.find(args, null, { sort: { index: 1 } });    },
  },
  Mutation: {
    addCourse: async(_,args) => {
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
      delete args.id;
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
