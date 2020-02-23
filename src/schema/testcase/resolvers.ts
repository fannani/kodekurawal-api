import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Player: {
    user: ({ _id }, args, { models }) => {
      return models.user.findOne({ userdetailid: _id });
    },
    avatar: async ({ _id }, args, { models }) => {
      const player = await models.player.findById(_id);
      const avatar = await models.avatar.findOne({ _id: player.avatar });
      return avatar;
    },
    avatars: async ({ _id }, args, { models }) => {
      const player = await models.player.findById(_id);
      const avatars = await models.avatar.find();
      for (let i = 0; i < avatars.length; i++) {
        if (avatars[i].min_exp <= player.exp) {
          avatars[i].unlock = true;
        } else {
          avatars[i].unlock = false;
        }
      }
      return avatars;
    },
    badges: async ({ _id }, args, { models }) => {
      const player = await models.player.findById(_id).populate('badges');
      return player.badges;
    },
    achievements: async ({ _id }, args, { models }) => {
      const achievements = await models.achievement.find();
      for (let i = 0; i < achievements.length; i++) {
        achievements[i] = achievements[i].player(_id);
      }
      return achievements;
    },
    achievement_total: async ({ _id }, args, { models }) => {
      let total = 0;
      const achievements = await models.achievement.find();
      for (let i = 0; i < achievements.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const achievement = await achievements[i].player(_id);
        total += achievement.star;
      }
      return total;
    },
    stars: async ({ _id }, args, { models }) => {
      const score = await models.score.find({ player: _id });
      const mapping: any = {};
      for (let i = 0; i < score.length; i++) {
        let stars;
        if (mapping[score[i].stage]) stars = mapping[score[i].stage];
        else stars = [false, false, false];
        for (let a = 0; a < 3; a++) {
          if (score[i].stars[a]) {
            stars[a] = true;
          }
        }
        mapping[score[i].stage] = stars;
      }
      let total = 0;
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in mapping) {
        const stars = mapping[key];
        for (let i = 0; i < 3; i++) {
          if (stars[i]) {
            total++;
          }
        }
      }
      return total;
    },
    course: async ({ _id }, args, { models }) => {
      const score = await models.player.findById(_id);
      return score.getCourse();
    },
    level: async ({ _id }, args, { models }) => {
      const player = await models.player.findById(_id);
      return player.level();
    },
    target_exp: async ({ _id }, args, { models }) => {
      const player = await models.player.findById(_id);
      return player.targetExp();
    },
  },
  Query: {
    testcases: (_, args, { models }) => {
      return models.testcase.find(args);
    },
  },
  Mutation: {
    addTestCase: (_, { caption, script }, { models }) => {
      return models.testcase.create({
        caption,
        script,
      });
    },
    deleteTestcase: (_, { id }, { models }) => {
      const testcase = models.testcase.findByIdAndRemove(id);
      return testcase;
    },
  },
};

export default resolvers;
