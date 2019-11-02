import User from "./User"
import Player from "../player/Player";
import {UserInputError} from "apollo-server-errors";
const resolvers = {
  Query: {
    users: (_, args) => {
        return User.find(args)
    },
  },
  Mutation: {
    registerUser: async (_,args) => {
      const exist = await User.find({ email : args.email });
      const validationErrors = {};
      if (exist.length <= 0) {
        const newuser = new User({
          name : args.name,
          email : args.email,
          password : args.password,
          role: args.role,
        });
        return newuser.save();
      } else {
        validationErrors.email = 'Email sudah ada';
        throw new UserInputError('error', { validationErrors });
      }
    }
  }

};

export default resolvers;
