import { merge } from 'lodash';
import TestCase from '../../models/TestCase';
import User from "../../models/User"
import Player from "../player/Player"
import Avatar from "../avatar/Avatar"
import Achievement from "../achievement/Achievement"
import Score from "../course/stage/score/Score"

const resolvers = {
  Player : {
    user: ({ _id }) => {
        return User.findOne({ userdetailid: _id });
    },
    avatar: async({ _id }) => {
        const player = await Player.findById(_id);
        const avatar = await Avatar.findOne({ _id: player.avatar });
        return avatar;
    },
    avatars: async({ _id })=> {
        const player = await Player.findById(_id);
        const avatars = await Avatar.find();
        for (let i = 0; i < avatars.length; i++) {
          if (avatars[i].min_exp <= player.exp) {
            avatars[i].unlock = true;
          } else {
            avatars[i].unlock = false;
          }
        }
        return avatars;
    },
    badges: async({ _id }) => {
        const player = await Player.findById(_id).populate('badges');
        return player.badges;

    },
    achievements: async({ _id }) => {
        let achievements = await Achievement.find();
        for (let i = 0; i < achievements.length; i++) {
          achievements[i] = achievements[i].player(_id);
        }
        return achievements;

    },
    achievement_total: async({ _id }) => {
        let total = 0;
        let achievements = await Achievement.find();
        for (let i = 0; i < achievements.length; i++) {
          const achievement = await achievements[i].player(_id);
          total += achievement.star;
        }
        return total;

    },
    stars: async({ _id }) => {
        let score = await Score.find({ player: _id });
        let mapping = {};
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
        for (var key in mapping) {
          let stars = mapping[key];
          for (let i = 0; i < 3; i++) {
            if (stars[i]) {
              total++;
            }
          }
        }
        return total;

    },
    course: async({ _id }) => {
        const score = await Player.findById(_id);
        return score.getCourse();
      },
    level: async({ _id }) =>{
        const player = await Player.findById(_id);
        return player.level();

    },
    target_exp: async({ _id }) => {
        const player = await Player.findById(_id);
        return player.targetExp();
      },
  },
  Query: {
    testcases: (_, args) => {
      return TestCase.find(args);
    },
  },
  Mutation : {
    addTestCase: (_, {caption,script}) => {
      const newtest = new TestCase({
        caption,
        script,
      });
      return newtest.save();
    },
    deleteTestcase: (_,{id}) => {
      const testcase = TestCase.findByIdAndRemove(id);
      return testcase;
    }
  }

};

export default merge(resolvers);
