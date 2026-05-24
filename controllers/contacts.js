// import { name } from 'ejs';
import { getDb } from '../models/db.js';
import { ObjectId } from 'mongodb';
import * as mongodb from '../models/db.js';

const getAll = async (req, res) => {
  //swagger.tags(['Contacts']);
  try {
    const result = await getDb().db().collection('contacts').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingle = async (req, res) => {
  //swagger.tags(['Contacts']);
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid contact ID to find a contact.' });
    return;
  }
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getDb().db().collection('contacts').find({ _id: userId });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createContact = async (req, res) => {
  //swagger.tags(['Contacts']);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response.insertedId);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
  }
};

const updateContact = async (req, res) => {
  //swagger.tags(['Contacts']);
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid contact ID to update a contact.' });
    return;
  }
  const userId = new ObjectId(req.params.id);
  // FIX: Match the exact schema properties used in your project
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email, 
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
  
  if (response.modifiedCount > 0) {
    res.status(204).send(); // 204 No Content is correct for a successful PUT
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteContact = async (req, res) => {
  //swagger.tags(['Contacts']);
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid contact ID to delete a contact.' });
    return;
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

const renderContacts = async (req, res) => {
  try {
    const result = await getDb().db().collection('contacts').find();
    const contacts = await result.toArray();
    res.render('contacts', { contacts, title: 'Contacts' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getAll, 
  getSingle, 
  createContact, 
  updateContact, 
  deleteContact, 
  renderContacts };