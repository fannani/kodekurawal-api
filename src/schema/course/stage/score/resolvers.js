import Score from "../../../course/stage/score/Score";

const resolvers = {
  Query: {
    scores: (_, args) => {
      return Score.find(args)
    },
  },
  Mutation: {
    addScore: (_, { player, stage, score, time, stars, course, script }) => {
        const newscore = new Score({
          player,
          stage,
          score,
          time,
          stars,
          course,
          script,
        });
        newscore.save()
    }
  }

};

export default resolvers;
