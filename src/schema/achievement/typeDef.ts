import gql from 'graphql-tag';

export default gql`
  type Achievement {
    text: String!
    _id: ID!
    title: String!
    continuous: Boolean!
    caption: String
    star: Int
    target_point: Int
    point: Int
    detail: [AchievementDetail]
    updated_at: String!
  }

  extend type Query {
    achievements(_id: ID): [Achievement]
  }

  extend type Mutation {
    addAchievement(
      title: String!
      continuous: Boolean!
      file: Upload
    ): Achievement
  }
`;
