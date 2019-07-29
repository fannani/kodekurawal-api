import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import TestCaseType from '../../../../TestCase/type';
import TestCaseMission from './TestCaseMission';
import TestCase from '../../../../TestCase/TestCase';

const TestCaseMissionType = new GraphQLObjectType({
  name: 'TestCaseMission',
  description: 'This represent an TestCaseMission',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    mission: { type: GraphQLNonNull(GraphQLID) },
    testcase: {
      type: TestCaseType,
      async resolve({ _id }) {
        const data = await TestCaseMission.findOne({ _id });
        return TestCase.findOne({ _id: data.testcase });
      },
    },
    params: { type: GraphQLList(GraphQLString) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default TestCaseMissionType;
