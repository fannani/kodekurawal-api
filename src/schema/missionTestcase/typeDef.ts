import gql from 'graphql-tag';

export default gql`
  type TestCaseMission {
    _id: ID!
    mission: ID!
    testcase: TestCase
    params: [String]
    updated_at: String!
  }

  extend type Query {
    testCaseMissions(_id: ID, mission: ID): [TestCaseMission]
  }

  extend type Mutation {
    deleteTestCaseMission(id: ID!): TestCaseMission
    addTestCaseMission(
      mission: ID!
      testcase: ID!
      params: [String]
    ): TestCaseMission
  }
`;
