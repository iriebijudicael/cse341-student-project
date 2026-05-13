import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

let _db;

const initDb = async () => {
  if (_db) {
    console.log('Db is already initialized!');
    return _db;
  }
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    _db = client;
    return _db;
  } catch (err) {
    throw err;
  }
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

export {
  initDb,
  getDb,
};