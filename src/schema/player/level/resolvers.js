import mongoose from 'mongoose'
const PlayerLevel = mongoose.model("PlayerLevel")
const resolvers = {
  Query : {
    playerLevel : () =>{
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