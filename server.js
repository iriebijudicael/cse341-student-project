const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./models/db');
const dns = require('dns');


 // Change DNS
dns.setServers(["0.0.0.0", "1.0.0.1"]);
const app = express();
const PORT = process.env.PORT || 5500;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

// Fallback Uncaught Exception Handler
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Connected to DB and listening on port http://localhost:${PORT}`);
  }
});