const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.Controller.js')

router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/new-product', userController.newprdct);
router.get('/edit-product', userController.editprdct);


module.exports = router;
