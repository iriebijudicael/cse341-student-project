const db = require('../models/db');
const { ObjectId } = require('mongodb');

const getAllCarts = async (req, res) => {
  try {
    const result = await db.getDb().db('ecommerce').collection('carts').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while fetching shopping carts.' });
  }
};

const getSingleCart = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid cart ID to locate data.' });
    }
    const cartId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ecommerce').collection('carts').find({ _id: cartId });
    const lists = await result.toArray();
    
    if (lists.length === 0) {
      return res.status(404).json({ message: 'Shopping cart record not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while retrieving the cart.' });
  }
};

const createCart = async (req, res) => {
  try {
    const cart = {
      userId: req.body.userId,
      items: req.body.items,
      updatedAt: new Date()
    };
    const response = await db.getDb().db('ecommerce').collection('carts').insertOne(cart);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'An error occurred while initializing the shopping cart.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error creating cart entry.' });
  }
};

const updateCart = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid cart ID to execute adjustments.' });
    }
    const cartId = new ObjectId(req.params.id);
    const cart = {
      userId: req.body.userId,
      items: req.body.items,
      updatedAt: new Date()
    };
    const response = await db.getDb().db('ecommerce').collection('carts').replaceOne({ _id: cartId }, cart);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'No modifications made or target cart ID missing.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error executing shopping cart update.' });
  }
};

const deleteCart = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid cart ID to delete records.' });
    }
    const cartId = new ObjectId(req.params.id);
    const response = await db.getDb().db('ecommerce').collection('carts').deleteOne({ _id: cartId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Shopping cart record already missing or removed.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error processing cart purge.' });
  }
};

module.exports = { getAllCarts, getSingleCart, createCart, updateCart, deleteCart };