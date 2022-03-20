const path = require('path');







const mainController = {
    header: (req, res) => {
        res.render('./partials/header')
    },
    home: function (req, res) {
        res.render('home');
    },
    carrito: (req, res) => {
        res.render('carrito');
    }
}





module.exports = mainController;