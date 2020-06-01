import gql from 'graphql-tag';

export default gql`
  type AchievementDetail {
    _id: ID!
    achievement: ID!
    star: Int!
    caption: String!
    target_point: Int!
    updated_at: String!
  }

  extend type Mutation {
    addDetailAchievement(
      achievement: ID!
      star: Int!
      caption: String!
      target_point: Int!
    ): AchievementDetail
  }
`;
