import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let _db;

export const initDb = async () => {
  if (_db) {
    console.log('Db is already initialized!');
    return _db;
  }
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client;
    return _db;
  } catch (err) {
    throw err;
  }
};

export const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};