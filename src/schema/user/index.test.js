import "regenerator-runtime/runtime";
import {ApolloServer} from "apollo-server-express";
import typeDefs from "../schema.graphql";
import resolvers from "../resolvers";
import models from "../../models";

const { createTestClient } = require('apollo-server-testing');

describe('test', () => {
  it('testit', () => {

    const apollo = new ApolloServer({
      typeDefs ,
      resolvers,
      context: ({ req }) => ({
        user: req.user,
        models
      }),
      uploads: {
        maxFileSize: 20000000, // 20 MB
        maxFiles: 20,
      },
    });
    const { query, mutate } = createTestClient(apollo);

    expect(true).toBe(true);
  })
})
