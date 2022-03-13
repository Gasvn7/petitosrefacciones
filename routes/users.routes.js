const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.Controller.js')

router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/save', userController.saveUser);







module.exports = router;
