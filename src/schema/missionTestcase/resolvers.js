import TestCaseMission from "../../models/TestCaseMission";
import TestCase from "../../models/TestCase";

const resolvers = {
  TestCaseMission : {
    testcase : async ({ _id }) => {
      const data = await TestCaseMission.findOne({ _id });
      console.log(data);
      return TestCase.findOne({ _id: data.testcase });
    }
  },
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
