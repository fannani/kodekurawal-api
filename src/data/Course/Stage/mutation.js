import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import Stage from './Stage';
import { GraphQLUpload } from 'graphql-upload';
import StageType from './type';
import { storeFB } from '../../../utils/upload';
import CourseType from '../type';
import Course from '../Course';

const StageMutation = {
  addStage: {
    type: StageType,
    description: 'Add Stage',
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      teory: { type: GraphQLString },
      time: { type: GraphQLString },
      index: { type: GraphQLInt },
      exp_reward: { type: GraphQLInt },
      script: { type: GraphQLString },
      course: { type: GraphQLNonNull(GraphQLID) },
      language: { type: GraphQLString },
    },
    async resolve(
      root,
      { title, teory, time, course, index, exp_reward, script, language },
    ) {
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
          .where({ course })
          .sort('-index');
        if (tmp) stage.index = tmp.index + 1;
        else stage.index = 1;
      }
      return stage.save();
    },
  },
  updateStage: {
    type: StageType,
    description: 'Update Stage',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLString },
      teory: { type: GraphQLString },
      index: { type: GraphQLInt },
      time: { type: GraphQLInt },
      exp_reward: { type: GraphQLInt },
      course: { type: GraphQLID },
      file: { type: GraphQLUpload },
      script: { type: GraphQLString },
      language: { type: GraphQLString },
    },
    async resolve(root, args) {
      let id = '';
      if (args.file) {
        const { filename, createReadStream } = await args.file;
        const stream = createReadStream();
        const filestore = await storeFB({ stream, filename });
        id = filestore.id;
      }
      const editstage = await Stage.findById(args.id);
      delete args.id;
      delete args.file;
      editstage.set(args);
      editstage.imageid = id;
      return editstage.save();
    },
  },
  deleteStage: {
    type: StageType,
    description: 'Delete Stage',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    //TODO: Order Mass Update
    async resolve(root, args) {
      const stage = await Stage.findByIdAndRemove(args.id);
      return stage;
    },
  },
  reorderStage: {
    description: 'Reorder Course',
    type: CourseType,
    args: {
      courseid: { type: GraphQLID },
      source: { type: GraphQLInt },
      destination: { type: GraphQLInt },
    },
    async resolve(root, { courseid, source, destination }) {
      const current = await Stage.findOne({
        course: courseid,
        index: source,
      });
      current.index = destination;
      if (source < destination) {
        await Stage.updateMany(
          { course: courseid, index: { $lte: destination, $gt: source } },
          { $inc: { index: -1 } },
        );
      } else if (destination < source) {
        await Stage.updateMany(
          { course: courseid, index: { $gte: destination, $lt: source } },
          { $inc: { index: 1 } },
        );
      }
      await current.save();
      return Course.findById(courseid);
    },
  },
};

export default StageMutation;
