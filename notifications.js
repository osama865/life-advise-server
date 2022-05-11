const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const webpush = require('web-push')
const { MongoClient } = require("mongodb");
const express = require('express');
const app = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 3002

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT || "mailto:osama0000ibrahim@gmail.com", process.env.PUBLIC_VAPID_KEY || "BAHPN9XNOB9KiLT7KCnxZoJN8mLkMpG-PhNvLQShm91boF93h9RQiXY96XTTTwyRjAB6TLknbjs_Zpoohwtg-Uk", process.env.PRIVATE_VAPID_KEY || "3aGkYcoaidNC-7FG9BcFkDjsHyp9L5f8a9qcqtQg1c4")

app.get('/', (req, res) => {
  res.send('Hello world!')
})

// route for registering
// insert registeration data on collection ("subscribers")
// when sending notification retrive all subscribers endpoints
// send notification to all endpoints listed
// check notification and service worker at IOS and opera and firefox
// visit PWA store to see if you can make it downloadable

const payload = JSON.stringify({
  title: 'Hello!',
  body: 'It works.',
})

const url =
  "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/advice?retryWrites=true&w=majority";
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db("life")
    const collection = db.collection("advices")
    // random function to get docs
    async function random() {
      const arr = collection.aggregate([
        { $sample: { size: 1 } }
      ])
      return await arr.toArray();
    }

    async function multiple(skip, limit) {
      const arr = collection.find().skip(skip).limit(limit)
      return await arr.toArray();
    }

    app.get('/random', (req, res) => {
      random().then((array) => {
        res.send(array[0])
        console.log(array[0], "random doc");
      }).catch(err => {
        console.log(err);
      })
    })

    app.get('/multiple', (req, res) => {
      const skip = parseInt(req.query.skip)
      const limit = parseInt(req.query.limit)
      multiple(skip, limit).then((array) => {
        res.send(array)
        console.log(array, "10 docs");
        console.log(req.query);
      }).catch(err => {
        res.send('s')
      })
      /**
       * 
      
       */
    })


    app.post('/subscribe', (req, res) => {

      const subscription = req.body
      // first make sure no dublicate
      collection.findOne(subscription, {}, (err, res) => {
        if (err) console.error(err);
        if (res) {
          // if the doc is already saved just exit
          console.log('doc is found', res);
          return;
        } else {
          // if doc not found then add it 
          console.log('doc not found and will be inserted');
          collection.insertOne(subscription).then((result) => {
            console.log(result);
          }).catch((err) => {
            console.error(err);
          });
        }
      })

      async function getAllSubscribers() {
        return await collection.find().toArray()
      }

      // a function to send notification to all subscribers
      // @array paramaeter is an array of subscribers
      function notifyAll(array) {
        array?.map((obj) => {
          // obj is subscription details
          console.log(obj);
          /*
          setInterval(() => {
            webpush.sendNotification(subscription, payload)
              .then(result => console.log(result))
              .catch(e => console.log(e.stack))
          }, 1000 * 60 * 2)
          */
        })
        res.send(array)
      }

      app.get('/subs', (req, res) => {
        res.send(req.body)
        getAllSubscribers().then((result) => {
          // res.send(JSON.parse(result))
          console.log(result);
          // notification function
          notifyAll(result)
        }).catch((err) => {
          console.error(err);
        });
      })

      /**
       * setInterval(() => {
        webpush.sendNotification(subscription, payload)
          .then(result => console.log(result))
          .catch(e => console.log(e.stack))
      }, 1000 * 60 * 2)
      */
      res.status(200).json({ 'success': true })

    })
  });

app.get('/sub', (req, res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
