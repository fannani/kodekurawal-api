import Player from "../player/Player";

const resolvers = {
  Leaderboard : {
    player : ({_id}) => {
      return Player.findOne({ _id });
    }
  }
}

export default resolvers