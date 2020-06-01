import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { hash, compare } from 'bcryptjs';
import { Resolvers } from '../../generated/graphql';
import { setTokens } from '../../utils/auth';

const resolvers: Resolvers = {
  User: {
    player: ({ userdetailid }, args, { models }) => {
      return models.player.findOne({ _id: userdetailid });
    },
  },
  Query: {
    users: (_, args, { models }) => {
      return models.user.find(args);
    },
  },
  Mutation: {
    signIn: async (parent, { email, password }, { models }) => {
      const user = await models.user.findOne({ email });
      if (!user)
        throw new AuthenticationError('Email or Password is incorrect');
      const passwordValid = await compare(password, user.password);
      if (!passwordValid)
        throw new AuthenticationError('Email or Password is incorrect');
      return {
        tokens: setTokens(user),
        user,
      };
    },
    signUp: async (parent, args, { models }) => {
      const exist = await models.user.find({ email: args.email });
      const hashedPassword = await hash(args.password, 10);

      if (exist.length <= 0) {
        const player = await models.player.create({
          energy: 300,
          birthday: Date.now(),
          exp: 0,
        });
        const user = await models.user.create({
          name: args.name,
          email: args.email,
          password: hashedPassword,
          role: args.role,
          userdetailid: player._id,
        });
        return {
          tokens: setTokens(user),
          user,
        };
      }
      throw new UserInputError('Email already exists');
    },
  },
};

export default resolvers;
