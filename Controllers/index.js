const User = require("../Model/Schema");
const { addUser } = require("../Services");
const { hashCode } = require("../Services/hashing");

/**
 * All thae app logic lays here
 * Controller role is to extract data from request and call the right
 * method to handle the user request
 * Get user input.
 * Validate user input.
 * Validate if the user already exists.
 * Encrypt the user password.
 * Create a user in our database.
 * And finally, create a signed JWT token.
*/
const register = async (req , res, next) => {
    console.log('im the controller', req.body);
    const name = req.body.name
    const password = req.body.password
    const hashedPassword = hashCode(password)
    // addUser()
    const userData = {
        name  :name,
        hashedPassword : hashedPassword,
        authKey : "",
        email : "osama@gmail.com",
    }
    addUser(userData)
    res.send('hey client')
}

module.exports = {
    register
}