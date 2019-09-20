import {merge} from 'lodash'
import mongoose from 'mongoose'
import playerAchievement from './achievement/resolvers'
import playerLevel from './level/resolvers'

import Player from "./Player"
import User from "../user/User"
import Score from "../course/stage/score/Score"
import {UserInputError} from "apollo-server-errors";

const resolvers = {
  Player: {
    user: async ({ _id }) => {
      return User.findOne({ userdetailid: _id });
    },
    avatar: async ({ _id }) => {
      const player = await Player.findById(_id);
      const avatar = await Avatar.findOne({ _id: player.avatar });
      return avatar;

    },
    avatars: async ({ _id })=> {
      const player = await Player.findById(_id);
      const avatars = await Avatar.find();

      for (let i = 0; i < avatars.length; i++) {
        if (avatars[i].min_exp <= player.exp) {
          avatars[i].unlock = true;
        } else {
          avatars[i].unlock = false;
        }
      }
      return avatars
    },
    badges: async ({ _id }) => {
        const player = await Player.findById(_id).populate('badges');
        return player.badges;

      },
    achievements: async ({ _id }) => {
      let achievements = await Achievement.find();
      for (let i = 0; i < achievements.length; i++) {
        achievements[i] = achievements[i].player(_id);
      }
      return achievements;
    },
    achievement_total: async ({ _id }) => {
      let total = 0;
      let achievements = await Achievement.find();
      for (let i = 0; i < achievements.length; i++) {
        const achievement = await achievements[i].player(_id);
        total += achievement.star;
      }
      return total;
    },
    stars:  async ({ _id }) => {
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

    course: async ({ _id }) => {
      const score = await Player.findById(_id);
      return score.getCourse();
    },
    level:  async ({ _id }) => {
        const player = await Player.findById(_id);
        return player.level();

    },
    target_exp:  async ({ _id }) => {
        const player = await Player.findById(_id);
        return player.targetExp();

    },
  },
  Query: {
    players: (_, args) => {
      return Player.find(args);
    },
  },
  Mutation : {
    addEnergy :async(_,{energy , userid}) => {
      const player = await Player.findById(userid);
      if (player.energy + energy >= 0) {
        player.energy += energy;
      }
      return player.save();
    },
    changeAvatar :async(_,{player, avatar}) => {
      const editedPlayer = await Player.findById(player);
      editedPlayer.avatar = avatar;
      return editedPlayer.save();
    },
    addBadgePlayer: async(_,{id, badge}) => {
      const player = await Player.findOneAndUpdate(
        { _id: id },
        { $addToSet: { badges: badge } },
      );
      return player;
    },
    setTutorial: async(_,{userid, tutorial, index}) => {
      const player = await Player.findById(userid);
      const arr = player.tutorial;
      arr[index] = tutorial;
      player.tutorial = arr;
      return player.save();
    },
    addExp: async(_,{exp, userid}) => {
      const player = await Player.findById(userid);
      player.exp += exp;

      const dailyDate = new Date(player.daily_exp_date);
      const currentDate = new Date();
      if (dailyDate.getDate() !== currentDate.getDate()) {
        player.daily_exp = 0;
      }
      player.daily_exp += exp; //TODO: check if daily target achieved
      return player.save();
    },
    addFriend: async (_,{playerid, friendid}) => {
      const player = await Player.findById(playerid);
      player.friends.push(friendid);
      return player.save();
    },
    register :async (_,{name,email,password}) => {
      const exist = await User.find({ email });
      const validationErrors = {};
      if (exist.length <= 0) {
        const newplayer = new Player({
          energy: 300,
          birthday: Date.now(),
          exp: 0,
        });
        await newplayer.save();
        const newuser = new User({
          name,
          email,
          password,
          role: 'siswa',
          userdetailid: newplayer._id,
        });
        return newuser.save();
      } else {
        validationErrors.email = 'Email sudah ada';
        throw new UserInputError('error', { validationErrors });
      }
    }
  }

};

export default merge(resolvers, playerAchievement,playerLevel);
