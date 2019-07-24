const { ApolloServer } = require('apollo-server');
const {importSchema} = require('graphql-import');

const typeDefs = importSchema(__dirname + '/schema.graphql')
const server = new ApolloServer({ typeDefs });
server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
})