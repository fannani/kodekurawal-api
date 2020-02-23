import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    users: (_, args, { models }) => {
      return models.user.find(args);
    },
  },
  Mutation: {
    signIn: async (parent, { email, password }, { models }) => {
      const user = await models.user.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Email doesn't exists");
      }
      if (!user.verifyPassword(password)) {
        throw new AuthenticationError('Password is incorrect');
      }
      return user;
    },
    signUp: async (parent, args, { models }) => {
      const exist = await models.user.find({ email: args.email });
      console.log(exist);
      if (exist.length <= 0) {
        return models.user.create({
          name: args.name,
          email: args.email,
          password: args.password,
          role: args.role,
        });
      }
      const validationErrors = { email: 'Email sudah ada' };
      throw new UserInputError('error', { validationErrors });
    },
  },
};

export default resolvers;
