import gql from 'graphql-tag';

export default gql`
  type Mission {
    _id: ID!
    quest: String!
    score: Int!
    testcase: [TestCaseMission]
    updated_at: String!
  }

  extend type Query {
    missions: [Mission]
  }

  extend type Mutation {
    addMission(quest: String!, score: Int!, stage: ID!): Mission
    updateMission(id: ID!, quest: String, score: Int): Mission
  }
`;
