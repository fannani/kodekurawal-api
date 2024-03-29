import gql from 'graphql-tag';

export default gql`
  type PlayerAchievement {
    _id: ID!
    player: ID!
    achievement: ID!
    star: Int!
    point: Int!
    updated_at: String!
  }

  extend type Query {
    playerAchievements: [PlayerAchievement]
  }

  extend type Mutation {
    addPlayerAchievement(
      player: ID!
      achievement: ID!
      star: Int!
      point: Int!
    ): Achievement
    giveAchievement(player: ID!, achievement: ID!): Achievement
  }
`;
