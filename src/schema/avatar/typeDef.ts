import gql from 'graphql-tag';

export default gql`
  type Avatar {
    _id: ID!
    title: String
    min_exp: Int
    imageid: String
    unlock: Boolean
    updated_at: String!
  }

  extend type Query {
    avatars: [Avatar]
  }

  extend type Mutation {
    addAvatar(title: String!, min_exp: Int!, image: Upload): Avatar
  }
`;
