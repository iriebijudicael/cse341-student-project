
import express from 'express';
// Import your controller functions
const router = express.Router();
import swaggerRoutes from './swagger.js';
import { getAll, getSingle, createContact, updateContact, deleteContact, renderContacts } from './contacts.js';



// router.get('/', getAll); 
// router.get('/contacts/:id', getSingle);
// router.post('/contacts', createContact);
// router.put('/contacts/:id', updateContact);
// router.delete('/contacts/:id', deleteContact);
// // router.get('/contacts-list', renderContacts);

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);


// 1. Hook up the Swagger Documentation routes (/api-docs)
router.use('/', swaggerRoutes);




export default router;

