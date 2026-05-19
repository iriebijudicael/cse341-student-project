
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();



let db;

const initDb = (callback) => {
  if (db) {
    console.log('Db is already initialized!');
    return callback(null, db);
  }
  
  // Connects using your environment variable string safely
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      db = client;
      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
};


const getDb = () => {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db;
};

// Clean ES Module named exports to match your server.js and controllers
export {
  initDb,
  getDb
};