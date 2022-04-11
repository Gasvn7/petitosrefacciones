const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { check } = require('express-validator');

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

//* Middlewares *//
// Para enviar los errores de validación al usuario
const validation = require('../middleware/validation')
// Para verificar si ya inicio sesión el usuario
const guestMiddleware = require('../middleware/guestMiddleware')
// Para verificar redirigir al login si no inició sesión
const authMiddleware = require('../middleware/authMiddleware')

//* Routes *//
// REGISTRO
router.get('/register', guestMiddleware, userController.register);
router.post('/', upload.any(), validation, userController.registration);

// LOGIN
// Pendiente: Validar login ¿?
router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.loginProcess);

// PERFIL
router.get('/perfil/', authMiddleware, userController.profile);

// LOGOUT
router.post('/logout', userController.logout);

module.exports = router;