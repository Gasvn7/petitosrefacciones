const path = require('path');







const mainController = {
    header: (req, res) => {
        res.render('./partials/header')
    },
    home: function (req, res) {
        res.render('home');
    }
}





module.exports = mainController;