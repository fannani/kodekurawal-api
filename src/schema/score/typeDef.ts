import gql from 'graphql-tag';

export default gql`
  type Score {
    _id: ID!
    score: Int!
    time: Int!
    stars: [Boolean]!
    updated_at: String!
    script: String!
    player: Player
    course: Course
    stage: Stage
    stages: [Stage]
  }

  extend type Query {
    scores: [Score]
  }

  extend type Mutation {
    addScore(
      player: ID!
      stage: ID!
      course: ID!
      score: Int!
      time: Int!
      stars: [Boolean]!
      script: String!
    ): Score
  }
`;
