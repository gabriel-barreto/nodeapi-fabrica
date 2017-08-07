const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let usersSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String
});

let Users = Mongoose.model('users', usersSchema, 'Users');

module.exports = Users;