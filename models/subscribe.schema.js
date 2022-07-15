const mongoose = require("mongoose");

/* 
    {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dhAtw0imZ24:APA91bHjJvpIu8KX2IHHEaUbVH0JClMGBA0BX0jM7KXzFcSGEm_k8MGZKtQs32uYY4F07qHr0Z8UbJ7Z5zsYOl2ZzF6IJmuZ5BemR3VhaaaLMPN9YnB1gyAQx67yenG7QipxgJaR7uZf",
    "expirationTime": null,
    "keys": {
        "p256dh": "BNQmRpO23MOGnxoh3rW5TX_Ov8j7YKV2kbmgAgzWh1hOoPbs16TRH6HvW4yEEtlJ5vZNV49_2ZKXiTHRaZRt5Tc",
        "auth": "1jaF9XbZDvh7mdhkbjj7Gw"
    }
}
*/
const SubscribeSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true,
    },
    expirationTime: {
        type: String,
    },
    keys: {
        p256dh: {
            type: String,
            required: true
        },
        auth: {
            type: String,
            required: true
        },
    }
});

const Subscribe = mongoose.model("subscribers", SubscribeSchema);

module.exports = Subscribe;
