const { root, random, multiple } = require('../controllers');

const Router = require('express').Router();

Router.get('/', root)

Router.get('/random', random)

Router.post('/multiple' , multiple)


module.exports = {
    Router
}