import PlayerLevel from "PlayerLevel";


const resolvers = {
  Query : {
    playerlevel : () =>{
      return PlayerLevel.find(args);
    }
  },
  Mutation : {
    addPlayerLevel : ({ level, exp_req }) => {
      const newdata = new UserLevel({
        level,
        exp_req,
      });
      return newdata.save();
    },

  }
}

export default resolvers