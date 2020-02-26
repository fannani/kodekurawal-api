import { UserInputError } from 'apollo-server-errors';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Player: {
    user: async ({ _id }, args, { models }) => {
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
    players: (_, args, { models }) => {
      return models.player.find(args);
    },
  },
  Mutation: {
    addEnergy: async (_, { energy, userid }, { models }) => {
      const player = await models.player.findById(userid);
      if (player.energy + energy >= 0) {
        player.energy += energy;
      }
      return player.save();
    },
    changeAvatar: async (_, { player, avatar }, { models }) => {
      const editedPlayer = await models.player.findById(player);
      editedPlayer.avatar = avatar;
      return editedPlayer.save();
    },
    addBadgePlayer: async (_, { id, badge }, { models }) => {
      const player = await models.player.findOneAndUpdate(
        { _id: id },
        { $addToSet: { badges: badge } }
      );
      return player;
    },
    setTutorial: async (_, { userid, tutorial, index }, { models }) => {
      const player = await models.player.findById(userid);
      const arr = player.tutorial;
      arr[index as number] = tutorial;
      player.tutorial = arr;
      return player.save();
    },
    addExp: async (_, { exp, userid }, { models }) => {
      const player = await models.player.findById(userid);
      player.exp += exp;

      const dailyDate = new Date(player.daily_exp_date);
      const currentDate = new Date();
      if (dailyDate.getDate() !== currentDate.getDate()) {
        player.daily_exp = 0;
      }
      player.daily_exp += exp; // TODO: check if daily target achieved
      return player.save();
    },
    addFriend: async (_, { playerid, friendid }, { models }) => {
      const player = await models.player.findById(playerid);
      player.friends.push(friendid);
      return player.save();
    },
    register: async (_, { name, email, password }, { models }) => {
      const exist = await models.user.find({ email });
      if (exist.length <= 0) {
        const newplayer = await models.player.create({
          energy: 300,
          birthday: Date.now(),
          exp: 0,
        });
        return models.user.create({
          name,
          email,
          password,
          role: 'siswa',
          userdetailid: newplayer._id,
        });
      }
      throw new UserInputError('error', { email: 'Email sudah ada' });
    },
  },
};

export default resolvers;
