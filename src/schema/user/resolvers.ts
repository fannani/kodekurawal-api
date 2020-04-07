import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { hash, compare } from 'bcryptjs';
import { Resolvers } from '../../generated/graphql';
import { setTokens } from '../../utils/auth';

const resolvers: Resolvers = {
  Query: {
    users: (_, args, { models }) => {
      return models.user.find(args);
    },
  },
  Mutation: {
    signIn: async (parent, { email, password }, { models }) => {
      const user = await models.user.findOne({ email });
      if (!user) throw new AuthenticationError("Email or Password is incorrect");
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
        const user = await models.user.create({
          name: args.name,
          email: args.email,
          password: hashedPassword,
          role: args.role,
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
