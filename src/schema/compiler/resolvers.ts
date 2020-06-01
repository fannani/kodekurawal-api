import { Resolvers } from '../../generated/graphql';

const { cpp } = require('compile-run');

const resolvers: Resolvers = {
  Mutation: {
    compile: async (_, { script }) => {
      let result = 'error';
      try {
        const compiled = await cpp.runSource(script);
        if (compiled.stderr === '') {
          result = compiled.stdout;
        }
      } catch (e) {
        console.log(e);
      }
      return result;
    },
  },
};

export default resolvers;
