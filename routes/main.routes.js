const express = require('express');
const router = express.Router();


const mainController = require('../controllers/main.Controller.js')

router.get('/', mainController.home);
router.get('/header', mainController.header);
router.get('/carrito', mainController.carrito);



module.exports = router;
