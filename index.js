const express = require('express')
const app = express()
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 3001
app.use(express.json());
const url =
    "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/life?retryWrites=true&w=majority";

// var db;
let collectionName = "advices";
let dbName = "life";

app.get('/', (req, res) => {
    res.send('hey')
})
MongoClient.connect(url, { useUnifiedTopology: true })
    .then(db => {
        app.get('/data', (req, res) => {
            let advises = db.db(dbName).collection(collectionName).find().toArray()
            res.send(advises)
        })

        app.get('/', (req, res) => {
            res.send('hey')
        })

        app.get('/find_one', (req, res) => {
            const id = req.query.id
            const advice = db.db(dbName).collection(collectionName).findOne({ _id: `${id}` })
            res.send(`"${id}"`)
        })

        app.get('/find_first', (req, res) => {
            const advice = db.db(dbName).collection(collectionName).findOne()
        })

    })
    .catch(error => console.error(error))


// 61d553b2f7e27f9a58952f20 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app

