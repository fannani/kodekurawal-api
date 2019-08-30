import Mission from "Mission";

const resolvers = {
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
