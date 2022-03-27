const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


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
router.get('/register',userController.register);
router.post('/', upload.any(), userController.registration);

router.get('/login',validationLogin, userController.login);





module.exports = router;