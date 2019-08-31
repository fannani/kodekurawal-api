import User from "./User"
const resolvers = {
  Query: {
    users: (_, args) => {
        return User.find(args)
    },
  },

};

export default resolvers;
