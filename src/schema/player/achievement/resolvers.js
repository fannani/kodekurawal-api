import PlayerAchievement from "../../../data/Player/Achievement/PlayerAchievement";
import Player from "../../../data/Player/Player";


const resolvers = {
  Query : {
    playerAchievements: (_,args) => {
        PlayerAchievement.find(args)
    }
  },
  Mutation : {
    addPlayerLevel: (_, { player, achievement, star, point }) => {
      const newachiev = new PlayerAchievement({
        player,
        achievement,
        star,
        point,
      });
      return newachiev.save();
    },
    giveAchievement: async(_, { player, achievement }) => {
      const _player = await Player.findById(player);
      return _player.giveAchievement(achievement);
    }
  }
}

export default resolvers