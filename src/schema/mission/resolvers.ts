import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Mission: {
    stage: async ({ _id }, args, { models }) => {
      const mission = await models.mission.findOne({ _id });
      const stage = await models.stage.findOne({ _id: mission.stage });
      return stage;
    },
    testcase: ({ _id }, args, { models }) => {
      return models.testcaseMission.find({ mission: _id });
    },
  },
  Query: {
    missions: (_, args, { models }) => {
      return models.mission.find(args);
    },
  },
  Mutation: {
    addMission: (_, { quest, score, stage }, { models }) => {
      return models.mission.create({
        quest,
        score,
        stage,
      });
    },
    updateMission: async (_, args, { models }) => {
      const editmission = await models.mission.findById(args.id);
      editmission.set(args);
      return editmission.save();
    },
  },
};

export default resolvers;
