import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} from "graphql";


const QuestionType = new GraphQLObjectType({
  name : "Question",
  description: 'This represent a Question',
  fields: () => ({
    content : {type : GraphQLString},
    choice : {type: GraphQLList(GraphQLString)},
    answer: {type: GraphqlString},
    score : {type: GraphQLInt}
  })
})