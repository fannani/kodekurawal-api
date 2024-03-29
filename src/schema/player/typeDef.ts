import gql from 'graphql-tag';

export default gql`
  type Player {
    _id: ID!
    user: User!
    energy: Int!
    friends: [ID]
    daily_exp: Int
    avatar: Avatar
    avatars: [Avatar]
    daily_login: Boolean
    energy_time: String
    tutorial: [Boolean]
    badges: [Badge]
    achievements: [Achievement]
    achievement_total: Int
    stars: Int
    course: [Course]
    level: Int
    birthday: String
    exp: Int
    target_exp: Int
    updated_at: String
  }
  extend type Query {
    players(_id: ID, energy: Int): [Player]
  }

  extend type Mutation {
    addEnergy(energy: Int!, userid: ID!): Player
    changeAvatar(player: ID!, avatar: ID!): Player
    addBadgePlayer(id: ID!, badge: ID!): Player
    setTutorial(userid: ID!, tutorial: Boolean, index: Int): Player
    addExp(exp: Int!, userid: ID!): Player
    addFriend(playerid: ID!, friendid: ID!): Player
    register(name: String!, email: String!, password: String!): User
  }
`;
