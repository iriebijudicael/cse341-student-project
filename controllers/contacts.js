// // import { name } from 'ejs';
// // import { getDb } from '../models/db.js';
// // import { ObjectId } from 'mongodb';
// // import  mongodb from '../models/db.js';


// // const getAll = async (req, res) => {
// //   //swagger.tags(['Contacts']);
// //   try {
// //     const result = await getDb().db().collection('contacts').find();
// //     const lists = await result.toArray();
// //     res.setHeader('Content-Type', 'application/json');
// //     res.status(200).json(lists);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message || "An error occurred retrieving contacts." });
// //   }
// // };

// // const getSingle = async (req, res) => {
// //   //swagger.tags(['Contacts']);
// //   if(!ObjectId.isValid(req.params.id)) {
// //     res.status(400).json({ message: 'Must use a valid contact ID to find a contact.' });
// //     return;
// //   }
// //   try {
// //     const userId = new ObjectId(req.params.id);
// //     const result = await getDb().db().collection('contacts').find({ _id: userId });
// //     const lists = await result.toArray();
// //     res.setHeader('Content-Type', 'application/json');
// //     res.status(200).json(lists[0]);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // const createContact = async (req, res) => {
// //   //swagger.tags(['Contacts']);
// //   const contact = {
// //     firstName: req.body.firstName,
// //     lastName: req.body.lastName,
// //     email: req.body.email,
// //     favoriteColor: req.body.favoriteColor,
// //     birthday: req.body.birthday
// //   };
// //   const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
// //   if (response.acknowledged) {
// //     res.status(201).json(response.insertedId);
// //   } else {
// //     res.status(500).json(response.error || 'Some error occurred while creating the contact.');
// //   }
// // };

// // const updateContact = async (req, res) => {
// //   //swagger.tags(['Contacts']);
// //   if(!ObjectId.isValid(req.params.id)) {
// //     res.status(400).json({ message: 'Must use a valid contact ID to update a contact.' });
// //     return;
// //   }
// //   const userId = new ObjectId(req.params.id);
// //   // FIX: Match the exact schema properties used in your project
// //   const contact = {
// //     firstName: req.body.firstName,
// //     lastName: req.body.lastName,
// //     email: req.body.email, 
// //     favoriteColor: req.body.favoriteColor,
// //     birthday: req.body.birthday
// //   };

// //   const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
  
// //   if (response.modifiedCount > 0) {
// //     res.status(204).send(); // 204 No Content is correct for a successful PUT
// //   } else {
// //     res.status(500).json(response.error || 'Some error occurred while updating the contact.');
// //   }
// // };

// // const deleteContact = async (req, res) => {
// //   //swagger.tags(['Contacts']);
// //   if(!ObjectId.isValid(req.params.id)) {
// //     res.status(400).json({ message: 'Must use a valid contact ID to delete a contact.' });
// //     return;
// //   }
// //   const userId = new ObjectId(req.params.id);
// //   const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
// //   if (response.deletedCount > 0) {
// //     res.status(204).send();
// //   } else {
// //     res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
// //   }
// // };

// // const renderContacts = async (req, res) => {
// //   try {
// //     const result = await getDb().db().collection('contacts').find();
// //     const contacts = await result.toArray();
// //     res.render('contacts', { contacts, title: 'Contacts' });
// //   } catch (error) {
// //     res.status(500).send(error.message);
// //   }
// // };

// // export { getAll, 
// //   getSingle, 
// //   createContact, 
// //   updateContact, 
// //   deleteContact, 
// //   renderContacts };




// import { getDb } from '../models/db.js';
// import { ObjectId } from 'mongodb';

// const getAll = async (req, res) => {
//   try {
//     const result = await getDb().db().collection('contacts').find().toArray();
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message || "An error occurred retrieving records." });
//   }
// };

// const getSingle = async (req, res) => {
//   try {
//     if (!ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Must use a valid contact id to find a contact." });
//     }
//     const contactId = new ObjectId(req.params.id);
//     const result = await getDb().db().collection('contacts').findOne({ _id: contactId });
//     if (!result) {
//       return res.status(404).json({ message: "Contact not found." });
//     }
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message || "An error occurred retrieving the record." });
//   }
// };

// const createContact = async (req, res) => {
//   try {
//     const newContact = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       favoriteColor: req.body.favoriteColor,
//       birthday: req.body.birthday
//     };
//     const response = await getDb().db().collection('contacts').insertOne(newContact);
//     res.status(201).json({ acknowledged: response.acknowledged, insertedId: response.insertedId });
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Database insertion failed." });
//   }
// };

// const updateContact = async (req, res) => {
//   try {
//     if (!ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Must use a valid contact id to update." });
//     }
//     const contactId = new ObjectId(req.params.id);
//     const updatedData = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       favoriteColor: req.body.favoriteColor,
//       birthday: req.body.birthday
//     };
//     const response = await getDb().db().collection('contacts').replaceOne({ _id: contactId }, updatedData);
//     if (response.modifiedCount === 0) {
//       return res.status(404).json({ message: "No contact found to update or data unchanged." });
//     }
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Database update failed." });
//   }
// };

// const deleteContact = async (req, res) => {
//   try {
//     if (!ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Must use a valid contact id to delete." });
//     }
//     const contactId = new ObjectId(req.params.id);
//     const response = await getDb().db().collection('contacts').deleteOne({ _id: contactId });
//     if (response.deletedCount === 0) {
//       return res.status(404).json({ message: "No contact found to delete." });
//     }
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Database deletion failed." });
//   }
// };

// export { getAll, getSingle, createContact, updateContact, deleteContact };