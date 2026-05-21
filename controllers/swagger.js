import express from 'express';
const router = express.Router();
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

// Resolve the path to your swagger-output.json file safely in ES Modules
const require = createRequire(import.meta.url);
const swaggerDocument = require('../swagger.json');

// Wire up the Swagger UI dashboard routes
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;