import TestCaseMission from "TestCaseMission";

const resolvers = {
  Query: {
    testCaseMissions: (_, args) => {
        TestCaseMission.find(args)
    },
  },
  Mutation: {
    deleteTestCaseMission: () => {
      const testcase = TestCaseMission.findByIdAndRemove(id);
      return testcase;
    },
    addTestCaseMission: (_, {mission, testcase,params}) => {
      const newtest = new TestCaseMission({
        mission,
        testcase,
        params,
      });
      return newtest.save();
    },
  }
};

export default resolvers;
