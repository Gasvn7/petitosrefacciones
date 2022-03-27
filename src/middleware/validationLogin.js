const { body } = require('express-validator');

module.exports = [
    body('name').notEmpty().withMessage('Please enter a name'),
    body('email').notEmpty().isEmail().withMessage('Please enter a email'),
    body('password').notEmpty().withMessage('Please enter a password'),
]