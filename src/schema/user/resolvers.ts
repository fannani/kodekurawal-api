import { UserInputError } from 'apollo-server-errors';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    users: (_, args, { models }) => {
      return models.user.find(args);
    },
  },
  Mutation: {
    signIn: async (parent, args, context) => {

    },
    signUp: async (parent, args, { models }) => {
      const exist = await models.user.find({ email: args.email });
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
