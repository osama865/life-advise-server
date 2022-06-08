/**
 * datatbase connection and its percuders lay here
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const url =
  "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/life?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

exports = {
  db
}

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