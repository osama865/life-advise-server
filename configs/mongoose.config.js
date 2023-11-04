const mongoose = require("mongoose");
const url =
  process.env.URL ;

mongoose.connect(url, {
  dbName:"life",
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((error)=>{
  console.log(error);
})

module.exports = mongoose