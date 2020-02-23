import gql from 'graphql-tag';

export default gql`

  type PlayerLevel {
    _id: ID!
    level: Int!
    exp_req: Int!
    updated_at :String!
  }

  extend type Query {
    playerLevel: [PlayerLevel]
  }

  extend type Mutation {
    addPlayerLevel(level:Int!,exp_req:Int!):PlayerLevel
  }

`
