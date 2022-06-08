const { addUser, verfy } = require("../Services");
const { uuid } = require("../Services/generateAuthKey");
const { hashCode } = require("../Services/hashing");
const mongoose = require("mongoose");

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
const register = async (req, res, next) => {
    console.log('im the controller', req.body);
    const name = req.body.name
    const password = req.body.password
    const hashedPassword = hashCode(password)
    const authKey = uuid()

    const response = {
        message: `Your API authentication key is ${authKey} KEEP IT SECRET and do not give it to anyone.`,
        authKey: authKey
    }
    console.log(response, 'shshsh');
    // addUser()
    const userData = {
        name: name,
        hashedPassword: hashedPassword,
        authKey,
        email: "osama@gmail.com",
    }
    addUser(userData)
    res.send(response)
}

const check = async (req, res, next) => {
    const name = req.body.name
    const providedAuthKey = req.body.authKey
    const OK = {
        message: `You are authenticated, you can use the api as you want.`,
        secret: "i'm the secret flag, only choosen like you will obtain me."
    }

    const NotOK = {
        message: `You are not authenticated, you can't use this api.`,
        secret: "i'm the secret flag, only choosen will obtain me."
    }
    
   
    // addUser()
    const userData = {
        name: name,
        authKey: providedAuthKey,
    }
    verfy(userData).then((vrefied)=>{
        vrefied === true ? res.send(OK) : res.send(NotOK);
    })
}




const url =
    "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/life?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

module.exports = {
    register, 
    check
}