
import express from 'express';
// Import your controller functions
import { showHomePage } from './index.js';
import { getAll, getSingle, createContact, updateContact, deleteContact, renderContacts } from './contacts.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/contacts', getAll);
router.get('/contacts/:id', getSingle);
router.post('/contacts', createContact);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);
router.get('/contacts-list', renderContacts);

export default router;