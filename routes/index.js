import express from 'express';
import passport from 'passport';
import swaggerRouter from '../controllers/swagger.js';
import coursesRouter from './courses.js';
import instructorsRouter from './instructors.js';

const router = express.Router();

router.use('/', swaggerRouter);
router.use('/courses', coursesRouter);
router.use('/instructors', instructorsRouter);

router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default router;