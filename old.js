const express = require('express')
const app = express()
const { MongoClient } = require("mongodb");
require('./notifications')
const port = process.env.PORT || 3001
const url =
    "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/life?retryWrites=true&w=majority";

// var db;
let collectionName = "advices";
let dbName = "life";
let advs = [
    { _id: "61d553b2f7e27f9a58952f20", text: "Most of what matters in our lives takes place in our absence.", author: "Salman Rushdie", date: "2021-11-30T08:02:42.027Z", index: 0, language: "en" },
    { _id: "61d553b2f7e27f9a58952f21", text: "Human happiness and moral duty are inseparably connected.", author: "George Washington", date: "2021-11-30T08:02:42.065Z", index: 1, language: "en" },
    { _id: "61d553b2f7e27f9a58952f22", text: "No better words than \"thank you\" have yet been discovered to express the sincere gratitude of one's heart, when the two words are sincerely spoken.", author: "Alfred Montapert", date: "2021-11-30T08:02:42.077Z", index: 2, language: "en" },
    { _id: "61d553b2f7e27f9a58952f23", text: "Poetry is just the evidence of life. If your life is burning well, poetry is just the ash.", author: "Leonard Cohen", date: "2021-11-30T08:02:42.080Z", index: 3, language: "en" },
    { _id: "61d553b2f7e27f9a58952f24", text: "The moment a little boy is concerned with which is a jay and which is a sparrow, he can no longer see the birds or hear them sing.", author: "Eric Berne", date: "2021-11-30T08:02:42.083Z", index: 4, language: "en" },
    { _id: "61d553b2f7e27f9a58952f25", text: "Love is never wrong no matter what society says.", author: "Anthony T.Hincks", date: "2021-11-30T08:02:42.087Z", index: 5, language: "en" },
    { _id: "61d553b2f7e27f9a58952f26", text: "It is not reputation, wealth, fame, success or religiosity that glorifies God. It's slavery.", author: "indonesia123", date: "2021-11-30T08:02:42.090Z", index: 6, language: "en" },
    { _id: "61d553b2f7e27f9a58952f27", text: "Some things in life are too complicated to explain in any language.", author: "Haruki Murakami", date: "2021-11-30T08:02:42.094Z", index: 7, language: "en" },
    { _id: "61d553b2f7e27f9a58952f28", text: "To succeed in the new year, you have to set your priority right, pursue your goals with zeal and do away with procrastination.", author: "Bamigboye Olurotimi", date: "2021-11-30T08:02:42.097Z", index: 8, language: "en" },
    { _id: "61d553b2f7e27f9a58952f29", text: "Remember, you are not aspiring for perfection, Bombshell. You are aspiring for progress, one step at a time.", author: "Amber Hurdle", date: "2021-11-30T08:02:42.101Z", index: 9, language: "en" }
]

app.get('/', (req, res) => {
    res.send('hey')
})
MongoClient.connect(url, { useUnifiedTopology: true })
    .then(db => {
        app.get('/data', (req, res) => {
            res.send(advs)
            /**
             db.db(dbName).collection(collectionName).find().toArray().then((result) => {
                const advises = result
                res.send(advises)
            }).catch((err) => {
                console.error(err);
            });
            */

        })

        app.get('/find_one', (req, res) => {
            const id = req.query.id
            db.db(dbName).collection(collectionName).findOne({ _id: `${JSON.parse(id)}` }).then((result) => {
                const advice = result
                console.log(id);
                res.send(advice)
                res.send(id)
            }).catch((err) => {
                console.error(err);
            });
        })

        app.get('/find_first', (req, res) => {
            db.db(dbName).collection(collectionName).findOne().then((result) => {
                const advice = result
                console.log(advice);
                res.send(advice)
            }).catch((err) => {
                console.error(err);
            });
        })
    })
    .catch(error => console.error(error))


// 61d553b2f7e27f9a58952f20 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
exports.advises = advs
module.exports = app