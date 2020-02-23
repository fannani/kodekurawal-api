import gql from 'graphql-tag';

export default gql`
  type File {
    id: ID!
    title: String!
    path: String!
  }

  input FileInput {
    title: String!
    file: Upload!
  }

  extend type Query {
    files: [File]
    File(id: ID!): Course
  }

  extend type Mutation {
    uploadFile(input: FileInput!): File
  }
`;
