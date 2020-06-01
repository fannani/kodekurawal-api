import gql from 'graphql-tag';

export default gql`
  enum StageType {
    PROGRAMMING
    MATERIAL
    QUIZ
  }

  type Stage {
    _id: ID!
    title: String!
    teory: String
    exp_reward: Int
    index: Int
    time: Int
    win: Boolean
    score: Int
    type: StageType
    badge_name: String
    badge_image: String
    language: String
    stars: [Boolean]
    imageid: String
    script: String
    missions: [Mission]
    quiz: Quiz
    material: Material
    course: Course
    updated_at: String!
  }

  extend type Query {
    stages(_id: ID, course: ID, player: ID): [Stage]
  }

  extend type Mutation {
    addStage(
      title: String!
      teory: String
      time: Int
      index: Int
      index: Int
      exp_reward: Int
      course: ID!
      language: String
      script: String
      type: StageType
    ): Stage
    updateStage(
      id: ID!
      title: String
      teory: String
      index: Int
      time: Int
      exp_reward: Int
      course: ID
      file: Upload
      script: String
      language: String
    ): Stage
    deleteStage(id: ID!): Stage
    reorderStage(courseid: ID, source: Int, destination: Int): Course
  }
`;
