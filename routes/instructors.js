import express from 'express';
const router = express.Router();

// 💡 CRITICAL: Every local relative import MUST include the explicit '.js' extension
import * as instructorsController from '../controllers/instructors.js';
import * as validation from '../middleware/validate.js';
import { isAuthenticated } from '../middleware/authenticate.js';

// Public Read Operations
router.get('/', instructorsController.getAllInstructors);
router.get('/:id', instructorsController.getInstructorById);

// Secure Protected Write/Mutation Operations
// Pipeline sequence: Check OAuth Session -> Validate Schema Payload -> Execute DB Controller
router.post('/', isAuthenticated, validation.saveInstructor, instructorsController.postInstructor);
router.put('/:id', isAuthenticated, validation.saveInstructor, instructorsController.putInstructor);
router.delete('/:id', isAuthenticated, instructorsController.deleteInstructor);

export default router;