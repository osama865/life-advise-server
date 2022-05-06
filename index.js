const express = require('express')
const app = express()
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 3001


/**
 * const fs = require("fs");
const path = "./all.json";
const encode = "utf-8";
let advises = [];
const readFile = () => {
    const data = fs.readFileSync(path, encode);
    advises = JSON.parse(data);
    // console.log(advises);
    return data;
};

readFile();
 */

let advs = []
let db;
let collectionName = "advices";
let dbName = "life";

app.get('/data', (req, res) => {
    res.send(advs)
})

app.get('/', (req, res) => {
    res.send('hey')
})

app.get('/one', (req, res) => {
    let id = req.query.id
    res.send('hey', id)
    db.collection(collectionName).findOne(id).then((result) => {
        res.send('hey advice', result)
    })
})

const url =
    "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/life?retryWrites=true&w=majority";


MongoClient.connect(url, (err, res) => {
    if (err) throw new Error(err);
    db = res.db(dbName);
    const collection = db.collection(collectionName);
    db.collection(collectionName).findOne().toArray().then((res) => {
        advs = res
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app

