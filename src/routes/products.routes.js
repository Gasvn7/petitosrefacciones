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

//     CONTROLLER REQUIRE       //
const productController = require('../controllers/product.Controller.js')


//*1. Listado de productos*//
router.get('/lista', productController.showPrdcts)

//*2. Formulario de creación de productos*//
router.get('/create', productController.create);

//*4. Acción de creación (a donde se envía el formulario*//
router.post('/', upload.any(), productController.store);

//*5. Formulario de edición de productos*//
router.get('/edit/:id', productController.edit);

//*6. Acción de edición (a donde se envía el formulario*//
router.patch('/edit/:id', upload.any(), productController.update);

//*7. Acción de borrado*//
router.delete('/delete/:id', productController.destroy);

//*3. Detalle de un producto particular*//
router.get('/:id', productController.details);








module.exports = router;
