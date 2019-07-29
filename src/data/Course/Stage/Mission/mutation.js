import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import MissionType from './type';
import Mission from './Mission';
import Stage from '../Stage';

const Mutation = {
  addMission: {
    type: MissionType,
    description: 'Add Mission',
    args: {
      quest: { type: GraphQLNonNull(GraphQLString) },
      score: { type: GraphQLNonNull(GraphQLInt) },
      stage: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: (root, { quest, score, stage }) =>
      new Promise((resolve, reject) => {
        const newmission = new Mission({
          quest,
          score,
          stage,
        });
        newmission.save(err => {
          err ? reject(err) : resolve(newmission);
        });
      }),
  },
  updateMission: {
    type: MissionType,
    description: 'Update Mission',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      quest: { type: GraphQLString },
      score: { type: GraphQLInt },
    },
    async resolve(root, args) {
      const editmission = await Mission.findById(args.id);
      editmission.set(args);
      return editmission.save();
    },
  },
};

export default Mutation;
