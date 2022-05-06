const { MongoClient } = require("mongodb");
const app = require("..");

let advs = []
app.get('/data',(req,res)=>{
    res.send(advs)
})
const url =
    "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/life?retryWrites=true&w=majority";

let collectionName = "advices";
let dbName = "life";

MongoClient.connect(url, (err, res) => {
    if (err) throw new Error(err);
    const db = res.db(dbName);
    const collection = db.collection(collectionName);
    db.collection(collection).find().toArray().then((res)=>{
        advs = res
    })
});

/**
 * let advises = [];
const readFile = () => {
  const data = fs.readFileSync(path, encode);
  advises = JSON.parse(data);
  console.log(advises);
  return data;
};

readFile();
 */