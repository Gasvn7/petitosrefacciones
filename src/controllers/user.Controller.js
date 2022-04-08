const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const { receiveMessageOnPort } = require('worker_threads');

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
            password: bcrypt.hashSync('password', 10),
            image: image,
        };
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        res.redirect('/');
    },

    /* LOGIN */
    
    login: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            return res.send('La metiste');
        } else {
            res.render('user-login', { errors: errors.errors });
        }
    },
        processLogin: (req, res) => {

        let errors = validationResult(req);
        if(errors.isEmpty()) {

        } else{
            return res.render('user-login', { errors: errors.errors });
        }
        },
        processLogin: function(req, res) {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                let userJSON = fs.readFileSync('user.json', { encoding: 'utf-8' });
                let users;
                if (userJson == "") {
                    users = [];
                } else {
                    users = JSON.parse(userJson)
                }
                for (let i = 0; i < users.length; i++){
                    if(users[i]. email == req.params.email){
                        if(bcrypt.compareSync(req.params.password, users[i].password)) {
                            let usuarioAdentro = users[i];
                            break;
                        }
                    }
                }
                if(usuarioAdentro == undefined){
                    return res.render('login', { errors: 
                    [
                        {msg: 'No se pudo'}
                    ] });
                }
                req.session.suarioAdentro = usuarioAdentro;
                res.render('success');
            } else { 
                return res.render('login', { errors: errors.errors });
            }
        } 
}






module.exports = userController;