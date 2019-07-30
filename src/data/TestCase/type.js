import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const TestCaseType = new GraphQLObjectType({
  name: 'TestCase',
  description: 'This represent a TestCase',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    caption: { type: GraphQLNonNull(GraphQLString) },
    script: { type: GraphQLNonNull(GraphQLString) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default TestCaseType;
