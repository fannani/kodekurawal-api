import gql from 'graphql-tag';

export default gql`
  type TestCase {
    _id: ID
    caption: String
    script: String
    updated_at: String
  }

  extend type Query {
    testcases: [TestCase]
  }

  extend type Mutation {
    addTestCase(caption: String!, script: String!): TestCase
    deleteTestcase(id: ID!): TestCase
  }
`;
