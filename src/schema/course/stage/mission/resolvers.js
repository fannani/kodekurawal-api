import Mission from "./Mission";
import TestCaseMission from "./testcase/TestCaseMission";
const resolvers = {
  Mission: {
    testcase: async ({_id}) => {
      const testcase = await TestCaseMission.find({ mission: _id });
      return testcase;
    },
  },
  Query: {
    missions: (_, args) => {
        return Mission.find(args)
    },
  },
  Mutation: {
    addMission: (_,{ quest, score, stage }) => {
        const newmission = new Mission({
          quest,
          score,
          stage,
        });
        return newmission.save()

    },
    updateMission: async(_,args) => {
      const editmission = await Mission.findById(args.id);
      editmission.set(args);
      return editmission.save();
    }
  }

};

export default resolvers;
