import gql from 'graphql-tag';

export default gql`
  type Leaderboard {
    _id: ID!
    score: Int!
    player: Player
  }
`;
