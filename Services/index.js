const connection = require('../Model');
const User = require('../Model/Schema');
const { hashCode } = require('./hashing');

// all connections to database and queries lay here
exports.addUser = (userData = {}) => {
    const user = new User(userData)
    console.log("im the funny new user", user);
}