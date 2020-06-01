import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../schema/index';
import resolvers from '../schema/resolvers';
import { createContext as context } from './context';

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  uploads: {
    maxFileSize: 20000000, // 20 MB
    maxFiles: 20,
  },
});

export const testingServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  uploads: {
    maxFileSize: 20000000, // 20 MB
    maxFiles: 20,
  },
});

export default apollo;
