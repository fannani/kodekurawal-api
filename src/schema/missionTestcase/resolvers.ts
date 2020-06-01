import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  TestCaseMission: {
    testcase: async ({ _id }, args, { models }) => {
      const data = await models.testcaseMission.findOne({ _id });
      return models.testcase.findOne({ _id: data.testcase });
    },
  },
  Query: {
    testCaseMissions: (_, args, { models }) => {
      return models.testcaseMission.find(args);
    },
  },
  Mutation: {
    deleteTestCaseMission: (parent, { id }, { models }) => {
      const testcase = models.testcaseMission.findByIdAndRemove(id);
      return testcase;
    },
    addTestCaseMission: (parent, { mission, testcase, params }, { models }) => {
      return models.testcaseMission.create({
        mission,
        testcase,
        params,
      });
    },
  },
};

export default resolvers;
