const express = require('express')
const app = express()
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 3001


const url =
    "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/life?retryWrites=true&w=majority";

let db;
let collectionName = "advices";
let dbName = "life";
MongoClient.connect(url).then(res => {
    db = res.db(dbName)
}).catch(err => {
    console.error(err)
})

function find() {
    return db.collection(collectionName).find().toArray()
}

app.get('/data', (req, res) => {
    res.send(find())
})

app.get('/', (req, res) => {
    res.send('hey')
})

app.get('/find_one', (req, res) => {
    const id = req.query.id
    const advice = db.collection(collectionName).findOne({ _id: `${id}` })
    res.send(advice)
})

app.get('/find_first', (req, res) => {
    const advice = db.collection(collectionName).findOne()
    res.send('hey', advice)
})

// 61d553b2f7e27f9a58952f20 
app.get('/one', async (req, res) => {
    let id = req.query.id
    res.send(res.json(id))
    db.collection(collectionName).findOne().then((result) => {
        // res.status('hey advice', result)
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app

