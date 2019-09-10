import Player from "../player/Player";

const resolvers = {
  Leaderboard : {
    player : (_, {_id}) => {
      return Player.findOne({ _id });
    }
  }
}

export default resolvers