const webPush = require('web-push');
require('dotenv').config()

console.log(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);
webPush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

const send_notification = async (subscription = {}, payload = {}) => {
    console.log('im sending notification with the payload', payload);
    try {
        const sendedNotification = await webPush.sendNotification(subscription, JSON.stringify(payload))
        console.log(sendedNotification);
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    send_notification,
}
// console.log(process.env);

