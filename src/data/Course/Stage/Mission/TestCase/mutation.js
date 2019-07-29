import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

import TestCaseMission from './TestCaseMission';
import TestCaseMissionType from './type';

const TestCaseMissionMutation = {
  deleteTestCaseMission: {
    type: TestCaseMissionType,
    description: 'Delete TestCase Mission',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { id }) {
      const testcase = TestCaseMission.findByIdAndRemove(id);
      return testcase;
    },
  },
  addTestCaseMission: {
    type: TestCaseMissionType,
    description: 'Add TestCase Mission',
    args: {
      mission: { type: GraphQLNonNull(GraphQLID) },
      testcase: { type: GraphQLNonNull(GraphQLID) },
      params: { type: GraphQLList(GraphQLString) },
    },
    async resolve(root, { mission, testcase, params }) {
      const newtest = new TestCaseMission({
        mission,
        testcase,
        params,
      });
      return newtest.save();
    },
  },
};

export default TestCaseMissionMutation;
