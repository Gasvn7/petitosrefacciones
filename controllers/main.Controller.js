const path = require('path');
const mainController = {
    home: function (req, res) {
        res.render('home.ejs');
    }
}

module.exports = mainController;