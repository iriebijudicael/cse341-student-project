import { getDb } from '../models/db.js';

const getAll = async (req, res) => {
  try {
    const result = await getDb().db().collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;
    const result = await getDb().db().collection('contacts').findOne({ _id: contactId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = req.body;
    const result = await getDb().db().collection('contacts').insertOne(contact);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = req.body;
    const result = await getDb().db().collection('contacts').updateOne({ _id: contactId }, { $set: contact });
    if (result.modifiedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const result = await getDb().db().collection('contacts').deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const renderContacts = async (req, res) => {
  try {
    const result = await getDb().db().collection('contacts').find();
    const contacts = await result.toArray();
    res.render('contacts', { contacts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAll, getSingle, createContact, updateContact, deleteContact, renderContacts };