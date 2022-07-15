const { Router } = require("./advice.routes")
const { subscribe, unsubscribe , notFound, notify} = require('../controllers');

Router.post('/subscribe', subscribe)

Router.post('/unsubscribe', unsubscribe)

Router.post('/notify', notify)

Router.all('*', notFound)

module.exports = {
    Router
}