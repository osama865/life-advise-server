const express = require('express')
const app = express()
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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app

