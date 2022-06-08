const mongoose = require("mongoose");

/**
 user scheme = {
     _id,
     username,
     hashedPassword,
     authKey,
     connectionsAmount,
     date,
     email
     
 }
 */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    authKey: {
        type: String,
        required: true,
    },
    requestsNumber: {
        type: Number,
        default: 0
    },
    date: { type: Date, default: Date.now },
    email: { type: mongoose.SchemaTypes.String },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;