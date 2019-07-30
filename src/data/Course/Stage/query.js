import { GraphQLID, GraphQLList } from 'graphql';
import StageType from './type';
import Stage from './Stage';
import Course from '../Course';

const stages = {
  type: new GraphQLList(StageType),
  description: 'List of all Stage',
  args: {
    _id: {
      type: GraphQLID,
    },
    course: {
      type: GraphQLID,
    },
    player: {
      type: GraphQLID,
    },
  },
  async resolve(parent, args) {
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
};

export default stages;
