const express = require('express')
const app = express()
const port = 3001

const { MongoClient } = require("mongodb");
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

const mongoose = require('mongoose');

const uri = 'mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/advice?retryWrites=true&w=majority';

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).
    then(() => console.log('Connected')).
    catch(err => console.log('Caught', err.stack));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

