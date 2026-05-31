import express from 'express';
const router = express.Router();

import * as coursesController from '../controllers/courses.js';
import * as validation from '../middleware/validate.js';
import { isAuthenticated } from '../middleware/authenticate.js';

router.get('/', coursesController.getAllCourse);
router.get('/:id', coursesController.getCourseById);

router.post('/', isAuthenticated, validation.saveCourse, coursesController.postCourse);
router.put('/:id', isAuthenticated, validation.saveCourse, coursesController.putCourse);
router.delete('/:id', isAuthenticated, coursesController.deleteCourse);

export default router;