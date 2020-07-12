import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Score: {
    player: async ({ _id }, __, { models }) => {
      const score = await models.score.findOne({ _id });
      return models.player.findOne({ _id: score.player });
    },
    course: async ({ _id }, args, { models }) => {
      const score = await models.score.findOne({ _id });
      return models.course.findOne({ _id: score.course });
    },
    stage: async ({ _id }, args, { models }) => {
      const score = await models.score.findOne({ _id });
      return models.stage.findOne({ _id: score.stage });
    },
    stages: async ({ _id }, __, { models }) => {
      const score = await models.score.findOne({ _id });
      const course = await models.course.findById(score.course);
      return course.player(score.player);
    },
  },
  Query: {
    scores: (_, args, { models }) => {
      return models.score.find(args);
    },
  },
  Mutation: {
    addScore: (
      _,
      { player, stage, score, time, stars, course, script },
      { models }
    ) => {
      return models.score.create({
        player,
        stage,
        score,
        time,
        stars,
        course,
        script,
      });
    },
  },
};

export default resolvers;
