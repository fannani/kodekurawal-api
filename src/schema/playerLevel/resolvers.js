import mongoose from 'mongoose'
const PlayerLevel = mongoose.model("PlayerLevel")
const resolvers = {
  Query : {
    playerLevel : (_,args) =>{
      return PlayerLevel.find(args);
    }
  },
  Mutation : {
    addPlayerLevel : (_,{ level, exp_req }) => {
      const newdata = new PlayerLevel({
        level,
        exp_req,
      });
      return newdata.save();
    },

  }
}

export default resolvers