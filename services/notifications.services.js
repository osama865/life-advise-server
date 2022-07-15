const Subscribe = require('../models/subscribe.schema');


const get_user = async (subscription = {}) => {
    try {
        const subscriber = await Subscribe.findOne(subscription)
        return subscriber;
    } catch (error) {
        console.error(error)
        return;
    }
}

const remove_user = async (subscription = {}) => {
    // remove a subscriber
    try {
        return await Subscribe.findOneAndDelete(subscription);
    } catch (error) {
        console.error(error)
        return;
    }
}

const subscribe_user = async (subscription = {}) => {
    // ensure no dublicates
    const user = await get_user(subscription)
    if (user) {
        console.log("user is already subscribed", user)
        return;
    }

    try {
        const subscriber = new Subscribe(subscription)
        const result = await subscriber.save()
        return result;
    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = {
    subscribe_user,
    remove_user,
}