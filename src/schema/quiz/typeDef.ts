import gql from 'graphql-tag';

export default gql`
  type Quiz {
    _id: ID!
    title: String
    questions: [Question]
    time: Int
    stage: Stage
  }
  input QuizInput {
    time: Int
    title: String
    questions: [QuestionInput]
    stage: ID
  }

  input QuestionInput {
    content: String
    questionType: QuestionType
    choice: [String]
    answer: String
    score: Int!
  }

  type Question {
    content: String
    questionType: QuestionType
    choice: [String]
    answer: String
    score: Int!
  }

  enum QuestionType {
    MULTIPLE_CHOICE
    ESSAY
  }

  input QuizWhere {
    id: ID
    stage: ID
  }

  input AnswerInput {
    index: Int!
    answer: String
  }

  input QuizSubmitInput {
    time: Int
    quiz: ID
    player: ID
    answer: [AnswerInput]
  }

  extend type Query {
    quiz(where: QuizWhere!, random: Boolean = false): Quiz
    allQuiz: [Quiz]
  }

  extend type Mutation {
    createQuiz(input: QuizInput!): Quiz
    upsertQuiz(id: ID!, data: QuizInput!): Quiz
    updateQuiz(id: ID!, input: QuizInput!): Quiz
    deleteQuiz(id: ID!): Quiz
    submitQuiz(input: QuizSubmitInput!): Score
  }
`;
