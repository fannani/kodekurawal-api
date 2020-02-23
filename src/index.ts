import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import * as admin from 'firebase-admin';
import apollo from './utils/apollo';

const serviceAccount = require('../firebasekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'kodekurawal-ab777.appspot.com',
});
dotenv.config({ path: path.join(__dirname, '../.env') });

// SETUP MONGOOSE ORM
const { ObjectId } = mongoose.Types;
mongoose.connect(process.env.DB_HOST as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// END SETUP MONGOOSE

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

apollo.applyMiddleware({
  app,
  path: '/api',
});

app.get('/', (req, res) => {
  res.send(`
		<div align="center">
			___________________
			<br/>
			Welcome to KodeKurawal API 1.3.1-beta
			<br/>
			______🚀😀🚀_____
		</div>
	`);
});
app.listen(process.env.PORT);
