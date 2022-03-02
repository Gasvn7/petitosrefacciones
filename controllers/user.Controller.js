const path = require('path');
const userController = {
    register: function (req, res) {
        res.render('register.ejs');
    },
    login: function (req, res) {
        res.render('login.ejs');
    },
    newprdct: function (req, res) {
        res.render('newprdct.ejs');
    },
    editprdct: function (req, res) {
        res.render('editprdct.ejs');
    }
}

module.exports = userController;