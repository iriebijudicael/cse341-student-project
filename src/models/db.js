// import dotenv from 'dotenv';
// dotenv.config();
// import { MongoClient } from 'mongodb';



// let db;

// const initDb = (callback) => {
//   if (db) {
//     console.log('Db is already initialized!');
//     return callback(null, db);
//   }
  
//   // Connects using your environment variable string safely
//   MongoClient.connect(process.env.MONGODB_URL || process.env.MONGODB_URI)
//     .then((client) => {
//       db = client;
//       callback(null, db);
//     })
//     .catch((err) => {
//       callback(err);
//     });
// };


// const getDb = () => {
//   if (!db) {
//     throw Error('Database not initialized');
//   }
//   return db;
// };

// // Clean ES Module named exports to match your server.js and controllers
// export {
//   initDb,
//   getDb
// };








import dotenv from 'dotenv';
dotenv.config(); // Ensures variables are loaded instantly

import { MongoClient } from 'mongodb';

// 1. Grab your connection string securely
const mongoURI = process.env.MONGODB_URL || process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error('MongoDB connection string is missing from environment variables.');
}

// 2. Instantiate the client globally (matching image_f68bcc.png)
const client = new MongoClient(mongoURI);

let db;

// 3. Connect method matching the instructor's architecture
function initDb(callback) {
  if (db) {
    console.log('Db is already initialized!');
    return callback(null, db);
  }

  client.connect()
    .then((connectedClient) => {
      db = connectedClient;
      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
}

// 4. Clean retrieval helper function
function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

export { initDb, getDb };