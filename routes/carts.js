const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts');
const validate = require('../middleware/validate');

router.get('/', cartsController.getAllCarts);
router.get('/:id', cartsController.getSingleCart);
router.post('/', validate.saveCart, cartsController.createCart);
router.put('/:id', validate.saveCart, cartsController.updateCart);
router.delete('/:id', cartsController.deleteCart);

module.exports = router;