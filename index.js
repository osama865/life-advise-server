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
// 61d553b2f7e27f9a58952f20 
app.get('/one', async (req, res) => {
    let id = req.query.id
    res.send('hey', res.json(id))
    db.collection(collectionName).findOne(id).then((result) => {
        res.send('hey advice', result)
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app

