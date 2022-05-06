const express = require('express')
const app = express()
const { MongoClient } = require("mongodb");
const port = 3001

const fs = require("fs");
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


let advs = []
app.get('/data', (req, res) => {
    res.send(advs)
})

app.get('/', (req, res) => {
    res.send('hey')
  })
const url =
    "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/life?retryWrites=true&w=majority";

let collectionName = "advices";
let dbName = "life";

MongoClient.connect(url, (err, res) => {
    if (err) throw new Error(err);
    const db = res.db(dbName);
    const collection = db.collection(collectionName);
    db.collection(collection).find().toArray().then((res) => {
        advs = res
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app

