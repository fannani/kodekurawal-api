import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} from 'graphql';
import { UserInputError } from 'apollo-server-express';
import Player from './Player';
import User from '../User/User';
import PlayerType from './type';
import UserType from '../User/type';

const PlayerMutation = {
  addEnergy: {
    type: PlayerType,
    description: 'Add Energy',
    args: {
      energy: { type: new GraphQLNonNull(GraphQLInt) },
      userid: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { energy, userid }) {
      const player = await Player.findById(userid);
      if (player.energy + energy >= 0) {
        player.energy += energy;
      }
      return player.save();
    },
  },
  changeAvatar: {
    type: PlayerType,
    description: 'Change Avatar',
    args: {
      player: { type: new GraphQLNonNull(GraphQLID) },
      avatar: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { player, avatar }) {
      const editedPlayer = await Player.findById(player);
      editedPlayer.avatar = avatar;
      return editedPlayer.save();
    },
  },
  addBadge: {
    type: PlayerType,
    description: 'Adding Badge',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      badge: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { id, badge }) {
      const player = await Player.findOneAndUpdate(
        { _id: id },
        { $addToSet: { badges: badge } },
      );
      return player;
    },
  },
  setTutorial: {
    type: PlayerType,
    description: 'Set Tutorial',
    args: {
      userid: { type: new GraphQLNonNull(GraphQLID) },
      tutorial: { type: GraphQLBoolean },
      index: { type: GraphQLInt },
    },
    async resolve(root, { tutorial, userid, index }) {
      const player = await Player.findById(userid);
      const arr = player.tutorial;
      arr[index] = tutorial;
      player.tutorial = arr;
      return player.save();
    },
  },
  addExp: {
    type: PlayerType,
    description: 'Adding Experience Point',
    args: {
      exp: { type: new GraphQLNonNull(GraphQLInt) },
      userid: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { exp, userid }) {
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
  },
  addFriend: {
    type: PlayerType,
    description: 'add friend',
    args: {
      playerid: { type: new GraphQLNonNull(GraphQLID) },
      friendid: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { playerid, friendid }) {
      const player = await Player.findById(playerid);
      player.friends.push(friendid);
      return player.save();
    },
  },
  register: {
    type: UserType,
    description: 'Register a player',
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(root, { name, email, password }) {
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
    },
  },
};

export default PlayerMutation;
