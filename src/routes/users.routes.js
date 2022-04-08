const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { check } = require('express-validator');
const session = require('express-session');


// MULTER //
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/pruebas');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage
});

//* Controller Require *//
const userController = require('../controllers/user.Controller.js')
const validationLogin = require('../middleware/validationLogin.js')

//* Routes *//
// REGISTRO
router.get('/register', userController.register);
router.post('/', upload.any(), userController.registration);

// LOGIN
router.get('/login', validationLogin, userController.login);
router.post('/login', [
    check('email').isEmail().withMessage('Tu correo no sirve'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener 6 letras')
], userController.processLogin);


router.get('/check', function (req, res) {
    if (res.session.usuarioAdentro == undefined) {
        res.send("No podes entrar");
    } else {
        res.send("El usuario ingresado es " + res.session.usuarioAdentro.email)
    }
})

module.exports = router;