import Player from "../player/Player";

const resolvers = {
  Leaderboard : (_, {_id}) => {
    return Player.findOne({ _id });
  }
}

export default resolvers