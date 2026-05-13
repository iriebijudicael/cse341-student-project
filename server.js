import express from 'express';
import { initDb } from './src/models/db.js';
import router from './src/controllers/routes.js';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();
const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, async () => {
  try {
    await initDb();
    console.log(`Connected to DB and listening on http://localhost:${port}/`);
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
});