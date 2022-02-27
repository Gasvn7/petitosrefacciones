const path = require('path');
const userController = {
    register: function (req, res) {
        res.render('register.ejs');
    },
    login: function (req, res) {
        res.render('login.ejs');
    }
}

module.exports = userController;