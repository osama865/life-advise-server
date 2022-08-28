const { send_notification } = require("../notifications");
const { wellcoming, resubscribing, sample } = require("../notifications/payloads");
const { subscribe_user, remove_user } = require("../services/notifications.services");
const { controllers } = require("./advice.controllers");

const subscribe = async (req, res) => {
    const subscription = req.body
    console.log(req.body);
    // ensure everey subscription atleast has an endpoint property
    if (subscription.endpoint === null) {
        console.log("endpoint of the subscription not found");
        res.send("endpoint of the subscription not found")
    }

    console.log('im the subscribe controller');
    try {
        await subscribe_user(subscription)
        await send_notification(subscription, wellcoming)
        console.log("user added successfuly")
        res.send("user added successfuly")
    } catch (error) {
        res.send(JSON.stringify(error))
    }
}

const unsubscribe = async (req, res) => {
    const subscription = req.body
    console.log(req.body);

    try {
        const user = await remove_user(subscription)
        await send_notification(subscription, resubscribing)
        if (user) {
            res.send("user removed successfuly")
            console.log("user removed successfuly")
        } else {
            res.send("user is not found")
            return
        }
    } catch (error) {
        throw new Error(err)
    }
}

// test push notifications
const notify = async (req, res) => {
    const subscription = req.body
    console.log("subscription data", subscription);
    await send_notification(subscription, "hello")
}


module.exports = {
    controllers: {
        ...controllers,
        subscribe,
        unsubscribe,
        notify
    }
}