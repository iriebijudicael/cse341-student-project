
import express from 'express';
// Import your controller functions
// import { showHomePage } from './index.js';
import swaggerRoutes from './swagger.js';
import { getAll, getSingle, createContact, updateContact, deleteContact, renderContacts } from './contacts.js';

const router = express.Router();

// router.get('/', showHomePage);
// router.get('/', getAll); 
// router.get('/contacts/:id', getSingle);
// router.post('/contacts', createContact);
// router.put('/contacts/:id', updateContact);
// router.delete('/contacts/:id', deleteContact);
// // router.get('/contacts-list', renderContacts);


// 1. Hook up the Swagger Documentation routes (/api-docs)
router.use('/', swaggerRoutes);


router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;