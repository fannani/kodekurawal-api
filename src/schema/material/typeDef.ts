import gql from 'graphql-tag';

export default gql`
  type Material {
    _id: ID!
    stage: Stage
    body: String
    materialType: MaterialType
    url: String
  }

  enum MaterialType {
    PDF
    WEB
  }

  input MaterialInput {
    body: String
    stage: ID
    materialType: MaterialType
    url: String
  }

  input MaterialWhere {
    _id: ID
    stage: ID
  }

  extend type Query {
    material(where: MaterialWhere!, css: Boolean = true): Material
    materials: [Material]
  }

  extend type Mutation {
    createMaterial(input: MaterialInput!): Material
    updateMaterial(where: MaterialWhere!, input: MaterialInput!): Material
    upsertMaterial(id: ID!, data: MaterialInput!): Material
    deleteMaterial(id: ID!): Material
  }
`;
