import { getDb } from '../models/db.js';
import { ObjectId } from 'mongodb';

const getAll = async (req, res) => {
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
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      ipAddress: req.body.ipAddress
    };
    const result = await getDb().db().collection('contacts').insertOne(contact);
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      res.redirect('/contacts-list');
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      res.status(500).send(error.message);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      ipAddress: req.body.ipAddress
    };
    const result = await getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
    res.status(204).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getDb().db().collection('contacts').deleteOne({ _id: userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

export { getAll, getSingle, createContact, updateContact, deleteContact, renderContacts };