import { storeFB } from '../../utils/upload';

import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Stage: {
    course: async ({ _id }, args, { models }) => {
      const stage = await models.stage.findOne({ _id });
      const course = await models.course.findOne({ _id: stage.course });
      return course;
    },
    missions: async ({ _id }, args, { models }) => {
      const missions = await models.mission.find({ stage: _id });
      return missions;
    },
    quiz: async ({ _id }, args, { models }) => {
      const quiz = await models.quiz.findOne({ stage: _id });
      return quiz;
    },
    material: async ({ _id }, args, { models }) => {
      const material = await models.material.findOne({ stage: _id });
      return material;
    },
  },
  Query: {
    stages: async (_, args, { models }) => {
      if (args.player && args.course) {
        const course = await models.course.findById(args.course);
        return course.player(args.player);
      }
      if (args.player) {
        const stage = await models.stage.findById(args._id);
        const player = await stage.player(args.player);
        return player;
      }
      return models.stage.find(args);
    },
  },
  Mutation: {
    addStage: async (
      _,
      { title, teory, time, course, index, exp_reward, script, language, type },
      { models }
    ) => {
      let indexData: number;
      if (index) {
        indexData = index;
      } else {
        const tmp = await models.stage
          .findOne()
          .where({ course })
          .sort('-index');
        if (tmp) indexData = tmp.index + 1;
        else indexData = 1;
      }
      const stage = await models.stage.create({
        title,
        teory,
        time,
        course,
        exp_reward,
        script,
        language,
        type,
        // imageid : id
        index: indexData,
      });
      if (type === 'MATERIAL') {
        await models.material({
          stage: stage._id,
        });
      }
      if (type === 'QUIZ') {
        await models.quiz.create({
          stage: stage._id,
        });
      }
      return stage;
    },

    updateStage: async (_, args, { models }) => {
      const editstage = await models.stage.findById(args.id);
      if (args.file) {
        const { filename, createReadStream } = await args.file;
        const stream = createReadStream();
        const filestore: any = await storeFB({ stream, filename });
        editstage.imageid = filestore.id;
      }
      // eslint-disable-next-line no-param-reassign
      delete args.id;
      // eslint-disable-next-line no-param-reassign
      delete args.file;
      editstage.set(args);

      return editstage.save();
    },
    deleteStage: async (_, args, { models }) => {
      const stage = await models.stage.findByIdAndRemove(args.id);
      return stage;
    },
    reorderStage: async (_, { courseid, source, destination }, { models }) => {
      const current = await models.stage.findOne({
        course: courseid,
        index: source,
      });
      current.index = destination;
      // @ts-ignore
      if (source < destination) {
        await models.stage.updateMany(
          { course: courseid, index: { $lte: destination, $gt: source } },
          { $inc: { index: -1 } }
        );
        // @ts-ignore
      } else if (destination < source) {
        await models.stage.updateMany(
          { course: courseid, index: { $gte: destination, $lt: source } },
          { $inc: { index: 1 } }
        );
      }
      await current.save();
      return models.course.findById(courseid);
    },
  },
};

export default resolvers;
