import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';

import TestCase from './TestCase';
import TestCaseType from './type';
import Course from '../Course/Course';

const TestCaseMutation = {
  addTestCase: {
    type: TestCaseType,
    description: 'Add TestCase',
    args: {
      caption: { type: GraphQLNonNull(GraphQLString) },
      script: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(root, { caption, script }) {
      const newtest = new TestCase({
        caption,
        script,
      });
      return newtest.save();
    },
  },
  deleteTestcase: {
    type: TestCaseType,
    description: 'Delete TestCase',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, args) {
      const testcase = await TestCase.findByIdAndRemove(args.id);
      return testcase;
    },
  },
};

export default TestCaseMutation;
