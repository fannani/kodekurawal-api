import Score from '../../models/Score';
import Stage from '../../models/Stage';
import Course from '../../models/Course';
import Player from '../../models/Player';

const resolvers = {
  Score: {
    player: async ({ _id }) => {
      const score = await Score.findOne({ _id });
      return Player.findOne({ _id: score.player });
    },
    course: async ({ _id }) => {
      const score = await Score.findOne({ _id });
      return Course.findOne({ _id: score.course });
    },
    stage: async ({ _id }) => {
      const score = await Score.findOne({ _id });
      return Stage.findOne({ _id: score.stage });
    },
    stages: async ({ _id }) => {
      const score = await Score.findOne({ _id });
      const course = await Course.findById(score.course);
      return course.player(score.player);
    },
  },
  Query: {
    scores: (_, args) => {
      return Score.find(args);
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
      return newscore.save();
    },
  },
};

export default resolvers;
