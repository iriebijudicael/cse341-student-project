const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const validate = require('../middleware/validate');

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getSingleOrder);
router.post('/', validate.saveOrder, ordersController.createOrder);
router.put('/:id', validate.saveOrder, ordersController.updateOrder);
router.delete('/:id', validate.deleteOrder || ordersController.deleteOrder);

module.exports = router;