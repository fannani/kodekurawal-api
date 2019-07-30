import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import StageType from '../type';
import Stage from '../Stage';
import Mission from './Mission';
import TestCaseMissionType from './TestCase/type';
import TestCaseMission from './TestCase/TestCaseMission';

const MissionType = new GraphQLObjectType({
  name: 'Mission',
  description: 'This represent a Mission',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    stage: {
      type: StageType,
      resolve: ({ _id }) => {
        return new Promise((resolve, reject) => {
          Mission.findOne({ _id }, (err, stage) => {
            Stage.findOne({ _id: stage.stage }, (err, stage) => {
              resolve(stage);
            });
          });
        });
      },
    },
    quest: { type: GraphQLNonNull(GraphQLString) },
    score: { type: GraphQLNonNull(GraphQLInt) },
    testcase: {
      type: GraphQLList(TestCaseMissionType),
      async resolve({ _id }) {
        const testcase = await TestCaseMission.find({ mission: _id });
        return testcase;
      },
    },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default MissionType;
