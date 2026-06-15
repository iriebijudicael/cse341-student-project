const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getSingleOrder);
router.post('/', isAuthenticated, validate.saveOrder, ordersController.createOrder);
router.put('/:id', isAuthenticated, validate.saveOrder, ordersController.updateOrder);
router.delete('/:id', isAuthenticated, ordersController.deleteOrder);

module.exports = router;