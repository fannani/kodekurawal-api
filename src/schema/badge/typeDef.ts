import gql from 'graphql-tag';

export default gql`
  type Badge {
    _id: ID!
    title: String
    imageid: String
    updated_at: String!
  }

  extend type Query {
    badges: [Badge]
  }

  extend type Mutation {
    addBadge(title: String!, imageid: String): Badge
    updateBadge(id: ID, title: String, image: Upload, course: ID): Badge
  }
`;
