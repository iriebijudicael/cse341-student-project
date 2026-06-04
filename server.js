// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import { fileURLToPath } from 'url';
// import bodyParser from 'body-parser';
// import path from 'path';
// import { initDb } from './models/db.js';
// import dns from 'dns';

// import * as mongodb from './models/db.js';
// import router from './controllers/routes.js';


// // Change DNS
// dns.setServers(["0.0.0.0", "1.0.0.1"]);
// const app = express();
// const PORT = process.env.PORT || 3001;
// const NODE_ENV = process.env.NODE_ENV || 'development';

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);


// // // 1. Serve static files first
// // app.use(express.static(path.join(__dirname, 'public')));


// // // Set the view engine to ejs
// // app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'views'));
// // // app.set('json spaces', 2);

// app.use(express.json());


// // Use the imported router
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(router);


// // 2. CORS Middleware Configuration
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

// // 3. Swagger Interactive Documentation Route
// // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// process.on('uncaughtException', (err, origine) => {
//   console.log(process.stderr.fd, `Caught Exception: ${err.message}\n` + `Exception origin: ${origin}`
    
//   );});

// mongodb.initDb((err) => {
//   if (err) {
//     console.error('MongoDB Connection Interrupted:', err);
//   } else {
//     app.listen(PORT, () => {
//       console.log(` Server is running at http://localhost:${PORT}`);
//     });
//   }
// });








import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initDb } from './models/db.js';
import passport from 'passport';
import session from 'express-session';
// import routesNexus from './routes/index.js';
import { Strategy as GitHubStrategy } from 'passport-github2';
import cors from 'cors';
import * as mongodb from './models/db.js';
import router from './routes/index.js';

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

app
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(router)
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

// 1. Session parsing middleware configuration
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out") });

// 1. ADD THE LOGIN ROUTE
app.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// 2. UPDATE YOUR CALLBACK ROUTE (Fixing the session: false issue)
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: true }), // Changed from false to true
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDb((err) => {
  if (err) {
    console.error('MongoDB Connection Interrupted:', err);
  } else {
    app.listen(PORT, () => {
      console.log(` Server is running at http://localhost:${PORT}`);
    });
  }
});