const path = require('path');







const userController = {

    register: function (req, res) {
        res.render('user-register');
    },

    login: function (req, res) {
        res.render('user-login');
    },

    saveUser: function (req, res) {
        
    }
}






module.exports = userController;