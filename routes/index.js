import express from 'express';
import passport from 'passport';
import swaggerRouter from './swagger.js';
import coursesRouter from './courses.js';
import instructorsRouter from './instructors.js';

const router = express.Router();

// Root Router Middleware Mounting
router.use('/', swaggerRouter);
router.use('/courses', coursesRouter);
router.use('/instructors', instructorsRouter);

// GitHub OAuth Core Authentication Handshake Initializer
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth Dynamic Callback Target
router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/api-docs', 
    session: true 
  }), 
  (req, res) => {
    // Save passport payload info directly into express-session state storage
    req.session.user = req.user; 
    res.redirect('/api-docs');
  }
);

// Session De-authorization Management Termination Route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { 
      return next(err); 
    }
    // Clean up session user object reference properties upon logout
    req.session.user = undefined;
    res.redirect('/api-docs');
  });
});

export default router;