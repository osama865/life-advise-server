/**
 * All thae app routea lays here
 * The user first register to get his/her authentication key
 * Whenever new request come, it must has the authentication key to verfy its identity
 * 
*/
const Router = require("express").Router();
const app = require('express')()
const { register, check } = require("../Controllers")
const cors = require('cors');
app.use(cors())
const bodyParser = require("body-parser");
const { verfy } = require("../Services");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

Router.post('/register', register)
Router.post('/check', check)
Router.post('/one', check)
Router.post('/multiple', (req, res) => {
    console.log(req.body);
})


Router.get('/', (req, res) => {
    res.send('hello')
})

app.use(Router)


app.listen(3003, () => {
    console.log('hey');
})