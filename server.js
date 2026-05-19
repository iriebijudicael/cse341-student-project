import express from 'express';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import path from 'path';
import { initDb } from './models/db.js';
import * as mongodb from './models/db.js';
import router from './controllers/routes.js';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// Change DNS
dns.setServers(["0.0.0.0", "1.0.0.1"]);
const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // 1. Serve static files first
// app.use(express.static(path.join(__dirname, 'public')));


// // Set the view engine to ejs
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// // app.set('json spaces', 2);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the imported router
app.use(bodyParser.json());
app.use(router);


// 2. CORS Middleware Configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// 3. Swagger Interactive Documentation Route
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
  if (err) {
    console.error('MongoDB Connection Interrupted:', err);
  } else {
    app.listen(PORT, () => {
      console.log(` Server is running at http://localhost:${PORT}`);
    });
  }
});