import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Reading: {
    user: (reading, _, { db }) => db.reading({ id: reading.id }).user(),
    material: (reading, __, { db }) =>
      db.reading({ id: reading.id }).material(),
  },
  Query: {
    readings: (_, __, { db }) => db.readings(),
  },
  Mutation: {
    createReading: (_, { input }, { db }) =>
      db.createReading({
        duration: input.duration,
        user: {
          connect: { id: input.user },
        },
        material: {
          connect: { id: input.material },
        },
      }),
  },
};

export default resolvers;
