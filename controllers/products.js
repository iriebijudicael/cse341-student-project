const db = require('../config/db');
const { ObjectId } = require('mongodb');

const getAllProducts = async (req, res) => {
  try {
    const result = await db.getDb().db('ecommerce').collection('products').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while fetching products.' });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid product ID to find a product.' });
    }
    const productId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ecommerce').collection('products').find({ _id: productId });
    const lists = await result.toArray();
    
    if (lists.length === 0) {
      return res.status(404).json({ message: 'Product item layout not found.' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred while retrieving the product.' });
  }
};

const createProduct = async (req, res) => {
  try {
    if (!req.body.title || !req.body.price) {
      return res.status(400).json({ message: 'Required fields missing: title and price are completely mandatory.' });
    }
    const product = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock
    };
    const response = await db.getDb().db('ecommerce').collection('products').insertOne(product);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while adding the product entry.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error creating product entries.' });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid product ID to update a product.' });
    }
    const productId = new ObjectId(req.params.id);
    const product = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock
    };
    const response = await db.getDb().db('ecommerce').collection('products').replaceOne({ _id: productId }, product);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'No updates made or product reference targets missing.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error processing product entry updates.' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid product ID to delete a product.' });
    }
    const productId = new ObjectId(req.params.id);
    const response = await db.getDb().db('ecommerce').collection('products').deleteOne({ _id: productId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product record path target missing.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal error deleting product.' });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
};