const { addUser, verfy, fetch_random, fetch_multiple } = require("../Services");
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

const OK = {
    message: `You are authenticated, you can use the api as you want.`,
    secret: "i'm the secret flag, only choosen like you will obtain me."
}
const NotOK = {
    message: `You are not authenticated, you can't use this api.`,
    secret: "i'm the secret flag, only choosen will obtain me."
}

const error = {
    message: "Sorry, some error happend",
    error: ""
}

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
    const reqData = {
        name: name,
        hashedPassword: hashedPassword,
        authKey,
        email: "osama@gmail.com",
    }
    addUser(reqData)
    res.send(response)
}

const fetchOne = async (req, res, next) => {
    const providedAuthKey = req.body.authKey
    const reqData = {
        authKey: providedAuthKey,
    }
    verfy(reqData).then((data) => {
        if (data === undefined) {
            res.send(NotOK)
        } else {
            fetch_random().then((result) => {
                res.send(result[0])
            }).catch((err) => {
                res.send(error)
            });
        }
    })
}

const fetchMultiple = async (req, res, next) => {
    const providedAuthKey = req.body.authKey
    const skip = req.body.skip
    const limit = req.body.limit

    const reqData = {
        authKey: providedAuthKey,
        skip,
        limit
    }

    verfy(reqData).then((data) => {
        if (data === undefined) {
            res.send(NotOK)
        } else {
            fetch_multiple(reqData).then((result) => {
                res.send(result)
            }).catch((err) => {
                error.error = err
                console.log(err);
                res.send(error)
            });
        }
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
    fetchOne,
    fetchMultiple
}