import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import Score from '../Course/Stage/Score/Score';
import User from '../User/User';
import Player from './Player';
import UserType from '../User/type';
import CourseType from '../Course/type';
import BadgeType from '../Badge/type';
import AchievementType from '../Achievement/type';
import Achievement from '../Achievement/Achievement';
import AvatarType from '../Avatar/type';
import Avatar from '../Avatar/Avatar';
import PlayerLevel from './Level/PlayerLevel';

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  description: 'This represent a Player',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    user: {
      type: GraphQLNonNull(UserType),
      async resolve({ _id }) {
        return User.findOne({ userdetailid: _id });
      },
    },
    energy: { type: GraphQLNonNull(GraphQLInt) },
    friends: { type: GraphQLList(GraphQLID) },
    daily_exp: { type: GraphQLInt },
    avatar: {
      type: AvatarType,
      async resolve({ _id }) {
        const player = await Player.findById(_id);
        const avatar = await Avatar.findOne({ _id: player.avatar });
        return avatar;
      },
    },
    avatars: {
      type: GraphQLList(AvatarType),
      async resolve({ _id }) {
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
    },
    daily_login: { type: GraphQLBoolean },
    energy_time: { type: GraphQLString },
    tutorial: { type: GraphQLList(GraphQLBoolean) },
    badges: {
      type: GraphQLList(BadgeType),
      async resolve({ _id }) {
        const player = await Player.findById(_id).populate('badges');
        return player.badges;
      },
    },
    achievements: {
      type: GraphQLList(AchievementType),
      async resolve({ _id }) {
        let achievements = await Achievement.find();
        for (let i = 0; i < achievements.length; i++) {
          achievements[i] = achievements[i].player(_id);
        }
        return achievements;
      },
    },
    achievement_total: {
      type: GraphQLInt,
      async resolve({ _id }) {
        let total = 0;
        let achievements = await Achievement.find();
        for (let i = 0; i < achievements.length; i++) {
          const achievement = await achievements[i].player(_id);
          total += achievement.star;
        }
        return total;
      },
    },
    stars: {
      type: GraphQLInt,
      async resolve({ _id }) {
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
    },
    course: {
      type: GraphQLList(CourseType),
      async resolve({ _id }) {
        const score = await Player.findById(_id);
        return score.getCourse();
      },
    },
    level: {
      type: GraphQLInt,
      async resolve({ _id }) {
        const player = await Player.findById(_id);
        return player.level();
      },
    },
    birthday: { type: GraphQLNonNull(GraphQLString) },
    exp: { type: GraphQLInt },
    target_exp: {
      type: GraphQLInt,
      async resolve({ _id }) {
        const player = await Player.findById(_id);
        return player.targetExp();
      },
    },

    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default PlayerType;
