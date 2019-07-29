import { GraphQLID, GraphQLList } from 'graphql';
import TestCase from './TestCase';
import TestCaseType from './type';

const testcase = {
  type: new GraphQLList(TestCaseType),
  description: 'List of all TestCase',
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    return TestCase.find(args);
  },
};

export default testcase;
