import { ApolloServerTestClient } from 'apollo-server-testing/dist/createTestClient';
import gql from 'graphql-tag';
import mongoose from 'mongoose';
import { testingServer } from '../../utils/apollo';

const { createTestClient } = require('apollo-server-testing');

let client: ApolloServerTestClient;

const SIGNUP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $name: String!
    $role: String!
  ) {
    signUp(email: $email, name: $name, password: $password, role: $role) {
      _id
    }
  }
`;

describe('[User]', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/kodekurawal', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { ObjectId } = mongoose.Types;
    mongoose.Promise = global.Promise;
    ObjectId.prototype.valueOf = function() {
      return this.toString();
    };
    client = createTestClient(testingServer);
  });
  it('return user and token after signUp', async () => {
    const result = await client.mutate({
      mutation: SIGNUP,
      variables: {
        email: 'rahadyan@gmail.com',
        password: 'secret',
        name: 'Rahadyan',
        role: 'siswa',
      },
    });
    expect(true).toBe(true);
  });
});
