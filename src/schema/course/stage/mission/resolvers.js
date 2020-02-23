import { merge } from 'lodash'
import Mission from "../../../../models/Mission";
import TestCaseMission from "../../../../models/TestCaseMission";
import testcaseMission from "./testcase/resolvers"
const resolvers = {
  Mission: {
    testcase:  ({_id}) => {
      return TestCaseMission.find({ mission: _id });
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

export default merge(resolvers,testcaseMission);
