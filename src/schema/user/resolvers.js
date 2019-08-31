import mongoose from 'mongoose'
const User = mongoose.model("User")
const resolvers = {
  Query: {
    users: (_, args) => {
        return User.find(args)
    },
  },

};

export default resolvers;
