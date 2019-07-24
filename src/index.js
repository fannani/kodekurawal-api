const { ApolloServer } = require('apollo-server');
const {importSchema} = require('graphql-import');
const { GraphQLUpload } = require('graphql-upload');


const typeDefs = importSchema(__dirname + '/schema.graphql')
console.log(typeDefs);
const resolvers = {
    Upload: GraphQLUpload
}
const server = new ApolloServer({ typeDefs,resolvers });
server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
})