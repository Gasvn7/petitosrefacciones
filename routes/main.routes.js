const express = require('express');
const router = express.Router();


const mainController = require('../controllers/main.Controller.js')

router.get('/', mainController.home);
router.get('/header', mainController.header);




module.exports = router;
