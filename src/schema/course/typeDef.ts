import gql from 'graphql-tag';

export default gql`
  type Course {
    _id: ID!
    name: String!
    index: Int
    script: String
    desc: String!
    imageid: String
    updated_at: String!
    badge: Badge
    stages: [Stage]
    leaderboard: [Leaderboard]
  }

  extend type Query {
    courses(_id: ID): [Course]
  }

  extend type Mutation {
    addCourse(
      name: String!
      desc: String!
      script: String
      file: Upload
    ): Course
    updateCourse(
      id: ID!
      name: String
      desc: String
      script: String
      file: Upload
    ): Course
    deleteCourse(id: ID!): Course
    uploadImage(courseid: ID, file: Upload): String
  }
`;
