const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const User = {

    findByPk: (id) => {
        let allUsers = users;
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound;
    },
    findByField: (field, text) => {
        let allUsers = users;
        let userFound = allUsers.find(oneUser => oneUser[field] === text)
        return userFound;
    },
    create: (userData) => {
        let allUsers = users;
        let image
        console.log(req.files);
        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = 'default-image.png'
        };
        let newUser = {
            id: allUsers[allUsers.length - 1].id + 1,
            ...userData,
            image: image,
        }
        allUsers.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    deleteUser: (id) => {
        let allUsers = users;
        let finalUsers = allUsers.filter(oneUser => oneUser.id != id);
        fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}

module.exports = User