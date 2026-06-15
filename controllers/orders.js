const db = require('../models/db');
const { ObjectId } = require('mongodb');

const getAllOrders = async (req, res) => {
  try {
    const result = await db.getDb().db('ecommerce').collection('orders').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while fetching tracking orders.' });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid order ID parameter matching.' });
    }
    const orderId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ecommerce').collection('orders').find({ _id: orderId });
    const lists = await result.toArray();
    
    if (lists.length === 0) {
      return res.status(404).json({ message: 'Order reference history mapping not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while retrieving order specifics.' });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = {
      userId: req.body.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      shippingAddress: req.body.shippingAddress,
      orderStatus: req.body.orderStatus || 'pending',
      createdAt: new Date()
    };
    const response = await db.getDb().db('ecommerce').collection('orders').insertOne(order);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'An error occurred while initializing order manifests.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error creating order ledger entries.' });
  }
};

const updateOrder = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid order ID to process adjustments.' });
    }
    const orderId = new ObjectId(req.params.id);
    const order = {
      userId: req.body.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      shippingAddress: req.body.shippingAddress,
      orderStatus: req.body.orderStatus,
      createdAt: new Date()
    };
    const response = await db.getDb().db('ecommerce').collection('orders').replaceOne({ _id: orderId }, order);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'No properties updated or order index not matching.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error applying tracking parameter overwrites.' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid order ID target parameter structure.' });
    }
    const orderId = new ObjectId(req.params.id);
    const response = await db.getDb().db('ecommerce').collection('orders').deleteOne({ _id: orderId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Order file path targets already cleared.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error executing order deletion removal handles.' });
  }
};

module.exports = { getAllOrders, getSingleOrder, createOrder, updateOrder, deleteOrder };