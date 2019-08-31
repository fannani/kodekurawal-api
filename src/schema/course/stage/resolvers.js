import { merge } from 'lodash'
import User from "../../user/User";
import Stage from "./Stage";
import {storeFB} from "../../../utils/upload";
import Course from "../../course/Course";
import mission from './mission/resolvers'
import score from './score/resolvers'

const resolvers = {
  Query: {
    stages: (_, args) => {
      return User.find(args)
    },
  },
  Mutation: {
    addStage: async (_, {title, teory, time, course, index, exp_reward, script, language}) => {
      let stage = new Stage({
        title,
        teory,
        time,
        course,
        exp_reward,
        script,
        language,
        // imageid : id
      });
      if (index) {
        stage.index = index;
      } else {
        const tmp = await Stage.findOne()
          .where({course})
          .sort('-index');
        if (tmp) stage.index = tmp.index + 1;
        else stage.index = 1;
      }
      return stage.save();
    },

    updateStage: async (_, args) => {
      let id = '';
      if (args.file) {
        const {filename, createReadStream} = await args.file;
        const stream = createReadStream();
        const filestore = await storeFB({stream, filename});
        id = filestore.id;
      }
      const editstage = await Stage.findById(args.id);
      delete args.id;
      delete args.file;
      editstage.set(args);
      editstage.imageid = id;
      return editstage.save();
    },
    deleteStage: async (_, args) => {
      const stage = await Stage.findByIdAndRemove(args.id);
      return stage;
    },
    reorderStage: async (_, {courseid, source, destination}) => {
      const current = await Stage.findOne({
        course: courseid,
        index: source,
      });
      current.index = destination;
      if (source < destination) {
        await Stage.updateMany(
          {course: courseid, index: {$lte: destination, $gt: source}},
          {$inc: {index: -1}},
        );
      } else if (destination < source) {
        await Stage.updateMany(
          {course: courseid, index: {$gte: destination, $lt: source}},
          {$inc: {index: 1}},
        );
      }
      await current.save();
      return Course.findById(courseid);
    }
  }
};

export default merge(resolvers,mission,score);
