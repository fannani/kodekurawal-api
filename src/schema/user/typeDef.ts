import gql from 'graphql-tag';

export default gql`
  type Tokens {
    accessToken: String
    refreshToken: String
  }
  type AuthPayload {
    tokens: Tokens
    user: User
  }
  type User {
    _id: ID!
    email: String!
    name: String!
    role: String!
    city: String
    province: String
    last_login: String
    userdetailid: String!
    password: String!
    updated_at: String!
  }

  extend type Query {
    users(_id: ID): [User]
  }

  extend type Mutation {
    signUp(
      name: String!
      email: String!
      password: String!
      role: String!
    ): AuthPayload
    signIn(email: String!, password: String!): AuthPayload
  }
`;
