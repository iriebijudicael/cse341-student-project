import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { initDb } from './src/models/db.js';
import router from './src/controllers/routes.js';
import dotenv from 'dotenv';
import dns from 'dns';



// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = express();
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 1. Serve static files first
app.use(express.static(path.join(__dirname, 'public')));


// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.set('json spaces', 2);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the imported router
app.use(router);

app.listen(PORT, async () => {
  try {
    await initDb();
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});