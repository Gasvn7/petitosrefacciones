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
})

//     CONTROLLER REQUIRE       //
const productController = require('../controllers/product.Controller.js')


//*TODOS LOS PRODUCTOS*//


//*CREAR PRODUCTO NUEVO*//
router.get('/create', productController.create);
router.post('/', upload.any(), productController.store);

//*EDITAR PRODUCTO*//
router.get('/edit/:id', productController.edit);

//*ELIMINAR PRODUCTO*//
router.delete('/delete/:id', productController.destroy);

//*DETALLES DE PRODUCTO*//
router.get('/:id', productController.details);




module.exports = router;
