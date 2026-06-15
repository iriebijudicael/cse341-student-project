const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts');
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', cartsController.getAllCarts);
router.get('/:id', cartsController.getSingleCart);
router.post('/', isAuthenticated, validate.saveCart, cartsController.createCart);
router.put('/:id', isAuthenticated, validate.saveCart, cartsController.updateCart);
router.delete('/:id', isAuthenticated, cartsController.deleteCart);

module.exports = router;