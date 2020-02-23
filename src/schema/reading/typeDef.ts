import gql from 'graphql-tag';

export default gql`
  type Reading {
    id: ID!
    material: Material
    user: User!
    duration: Int
    createdAt: DateTime!
  }

  input ReadingInput {
    material: ID!
    user: ID!
    duration: Int
  }

  extend type Query {
    readings: [Reading] @auth(requires: [USER, ADMIN])
  }

  extend type Mutation {
    createReading(input: ReadingInput!): Reading @auth(requires: [USER, ADMIN])
  }
`;
