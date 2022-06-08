const User = require('../Model/Schema');

// all connections to database and queries lay here
exports.addUser = async (userData = {}) => {
    const user = new User(userData)
    try {
        await user.save()
    } catch (error) {
        console.log(error);
    }
    console.log("im the funny new user", user);
}

exports.verfy = async (userData = {}) => {

    try {
        const res = await User.findOne({})
        console.log(userData, " userData", res, " reees");
        if (userData.name === res.name && userData.authKey === res.authKey) {
            console.log("shhhhhhhhhhhhhhhhhs");
            return true;
        } else {
            console.log("wrong");
            return false;
        }
    } catch (error) {

    }
}

