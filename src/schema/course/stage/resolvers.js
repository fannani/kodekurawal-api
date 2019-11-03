import { merge } from 'lodash'
import Stage from "./Stage";
import {storeFB} from "../../../utils/upload";
import Course from "../../course/Course";
import Mission from "./mission/Mission"
import mission from './mission/resolvers'
import score from './score/resolvers'
import material from './material/resolvers';
import quiz from './quiz/resolvers';
import Material from './material/Material';
import Quiz from './quiz/Quiz';
import {Schema} from "mongoose";

const resolvers = {
  Stage: {
    course: async ({_id}) => {
      let stage = await Stage.findOne({ _id });
      let course = await Course.findOne({ _id: stage.course });
      return course;
    },
    missions: async({_id}) => {
      const missions = await Mission.find({ stage: _id });
      return missions;
    },
    quiz: async({_id}) => {
      const quiz = await Quiz.findOne({stage : _id});
      return quiz;
    },
    material: async({_id}) => {
      const material = await Material.findOne({stage: _id});
      return material;
    }
  },
  Query: {
    stages: async (_, args) => {
      if (args.player && args.course) {
        let course = await Course.findById(args.course);
        return course.player(args.player);
      }
      if (args.player) {
        let stage = await Stage.findById(args._id);
        let player = await stage.player(args.player);
        return player;
      }
      return Stage.find(args);
    },
  },
  Mutation: {
    addStage: async (_, {title, teory, time, course, index, exp_reward, script, language, type}) => {
      let stage = new Stage({
        title,
        teory,
        time,
        course,
        exp_reward,
        script,
        language,
        type,
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
      await stage.save();
      if(type === "MATERIAL"){
        const material = new Material({
          stage: stage._id,
        })
        await material.save();
      }
	  if(type === "QUIZ"){
		const quiz = new Quiz({
		  stage: stage._id,
		})
		await quiz.save();
	  }

      return stage;
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

export default merge(resolvers,mission,score, material, quiz);
