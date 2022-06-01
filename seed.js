const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = "./test3.json";
const encode = "utf-8";
let advises = [];
const readFile = () => {
  const data = fs.readFileSync(path, encode);
  advises = JSON.parse(data);
  console.log(advises);
  return data;
};

readFile();
const url =
  "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/advice?retryWrites=true&w=majority";

MongoClient.connect(url, (err, res) => {
  if (err) throw new Error(err);
  const db = res.db("life");
  const collection = db.collection("advices");
  db.collection("advices")
    .insertMany(advises)
    .then((res) => {
      console.log(res);
    });
});

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
