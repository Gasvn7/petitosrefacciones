const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.Controller.js')

router.get('/detalles', productController.productos);


module.exports = router;
