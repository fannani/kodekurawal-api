import { merge } from 'lodash';
import Player from "Player";
import User from "User";
import {UserInputError} from "apollo-server-errors";

const resolvers = {
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

export default merge(resolvers);
