const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');

// Users model
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const res = require('express/lib/response');

/* PATH */
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* CONTROLLER */
const userController = {

    /* REGISTER */
    register: function (req, res) {
        res.render('user-register');
    },

    registration: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('user-register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        let userInDB = User.findByField('email', req.body.email)
        if (userInDB) {
            return res.render('user-register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            })
        }

        let image
        console.log(req.files);
        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = 'default-image.png'
        };
        let newUser = {
            id: users[users.length - 1].id + 1,
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: image,
        }

        let userCreated = newUser;

        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        return res.redirect('/users/login');
    },

    /* LOGIN */
    login: (req, res) => {
        return res.render('user-login');
    },
    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        console.log(req.body.remember_user);
        let remember = req.body.remember_user
        if (userToLogin) {
            let passApproved = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passApproved) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (remember) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
                }

                return res.redirect('/users/perfil');
            }
            return res.render('user-login', {
                errors: {
                    email: {
                        msg: 'Registrate porfa'
                    }
                }
            })
        }
        return res.render('user-login', {
            errors: {
                email: {
                    msg: 'Registrate wachin'
                }
            }
        })
    },
    // Render de el perfil - Enviar el usuario como objeto
    profile: function (req, res) {

        console.log(req.cookies.userEmail)

        res.render('user-profile', {
            user: req.session.userLogged
        });
    },
    // Cerrar sesión - Borrar el session
    logout: function (req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}






module.exports = userController;