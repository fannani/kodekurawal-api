import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represent a User',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLNonNull(GraphQLString) },
    city: { type: GraphQLString },
    province: { type: GraphQLString },
    last_login: { type: GraphQLString },
    userdetailid: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default UserType;
