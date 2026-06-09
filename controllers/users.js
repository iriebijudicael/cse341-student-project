const db = require('../config/db');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, res) => {
  try {
    const result = await db.getDb().db('ecommerce').collection('users').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while fetching users.' });
  }
};

const getSingleUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid user ID to find a user.' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ecommerce').collection('users').find({ _id: userId });
    const lists = await result.toArray();
    
    if (lists.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while retrieving the user.' });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.firstName || !req.body.lastName) {
      return res.status(400).json({ message: 'Required fields missing: email, firstName, and lastName are required.' });
    }
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role || 'customer'
    };
    const response = await db.getDb().db('ecommerce').collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the user account.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error creating user.' });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid user ID to update a user.' });
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role
    };
    const response = await db.getDb().db('ecommerce').collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'No user changes executed or user ID matching records not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error updating user.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid user ID to delete a user.' });
    }
    const userId = new ObjectId(req.params.id);
    const response = await db.getDb().db('ecommerce').collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User record path not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error deleting user.' });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};