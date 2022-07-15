const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Router } = require('../routes');
const app = express()

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors({
    origin: "*"
}))

// use Router
app.use(Router)

module.exports = app