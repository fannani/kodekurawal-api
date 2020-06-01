import gql from 'graphql-tag';

export default gql`
  extend type Mutation {
    compile(script: String!): String
  }
`;
