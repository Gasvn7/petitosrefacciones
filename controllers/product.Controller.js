const path = require('path');
const productController = {
    productos: function (req, res) {
        res.render('productDetail.ejs');
    },
    navigationBar: function (req, res) {
        res.render('navigationBar.ejs');
    }
}

module.exports = productController;