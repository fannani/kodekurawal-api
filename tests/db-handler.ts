import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const connect = async () => {
  const uri = await mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);
  const { ObjectId } = mongoose.Types;
  mongoose.Promise = global.Promise;
  ObjectId.prototype.valueOf = function() {
    return this.toString();
  };
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in collections) {
    const collection = collections[key];
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
};

export default {
  connect,
  clearDatabase,
  closeDatabase,
};
