const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('./models/db'); // Points to your database initialization file
const router = require('./routes/index');
const dns = require('dns');

dns.setServers(["0.0.0.0", "1.0.0.1"]);
const app = express();
const PORT = process.env.PORT || 5500;

// 1. Core Request Body Parsing Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// 2. Session Setup (Using MongoDB to store login tokens securely)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'ecommerce_secret_key',
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({
    //   mongoUrl: process.env.MONGODB_URL,
    //   collectionName: 'sessions'
    // }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', // true if live on Render (HTTPS)
      maxAge: 1000 * 60 * 60 * 24 // Cookie lifecycle: 24 hours
    }
  })
);

// 3. Initialize Passport and link it to the Session tracking framework
app.use(passport.initialize());
app.use(passport.session());

// 4. Configure the Passport GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      // For this student assignment, pass the authenticated user profile forward
      return done(null, profile);
    }
  )
);

// 5. Serialize & Deserialize User Sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// 6. Authentication Route Endpoints
// Triggers the initial GitHub authorization login screen redirect
app.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub Callback endpoint: where the user lands after successful external login authorization
app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    // Save user session and redirect straight to your interactive API documentation layout
    req.session.user = req.user;
    res.redirect('/api-docs');
  }
);

// Logout Route Endpoint
app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect('/api-docs');
    });
  });
});

// 7. Mount Application Level Router
app.use('/', router);

// Global Error Exception Fallback Handler
process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Initialize Database Connection and Start Listening
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on port http://localhost:${PORT}`);
    });
  }
});