const router = require('express').Router();
const productsController = require('../controllers/products');
const validation = require('../middleware/validate');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getSingleProduct);
router.post('/', validation.saveProduct, productsController.createProduct);
router.put('/:id', validation.saveProduct, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;