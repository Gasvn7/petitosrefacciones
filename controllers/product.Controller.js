const path = require('path');
const productController = {
    productos: function (req, res) {
        res.render('productDetail.ejs');
    },
}

module.exports = productController;