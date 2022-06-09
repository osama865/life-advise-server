const { db } = require('../Model/Schema');
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
        const res = await User.findOne({ authKey: userData.authKey })
        console.log(userData, " userData", res, " reees");
        if (userData.authKey === res.authKey) {
            console.log("now i'll fetch random data for you.");

            return this.fetchOne();
        } else {
            console.log("wrong");
            return undefined;
        }
    } catch (error) {

    }
}

exports.fetchOne = async () => {
    // later change the size to dynamic size.
    return await db.collection("advices").aggregate([{ $sample: { size: 1 } }]).toArray()
}