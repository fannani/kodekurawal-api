import gql from 'graphql-tag';
import User from './user/typeDef';

const typeDef = gql`
  type Mutation
  type Query
`;

export default [typeDef, User];
