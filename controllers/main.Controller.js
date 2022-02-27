const path = require('path');
const mainController = {
    home: function (req, res) {
        res.render('home.ejs');
    },
    navigationBar: function (req, res) {
        res.render('navigationBar.ejs');
    }
}

module.exports = mainController;