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


// six hours
const time = 21600000;

/**
 function generateVAPIDKeys() {
  const vapidKeys = webpush.generateVAPIDKeys();

  return {
    publicKey: vapidKeys.publicKey,
    privateKey: vapidKeys.privateKey,
  };
}

save it in db
 */
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

const payload = JSON.stringify({ _id: "61d553b2f7e27f9a58952f20", text: "Most of what matters in our lives takes place in our absence.", author: "Salman Rushdie", date: "2021-11-30T08:02:42.027Z", index: 0, language: "en" })
const wellcoming = JSON.stringify({ _id: "unsubscribe", text: "Hey, you'll be receiving advices via notifications like this a couple times a day, click save to save it in saved page so you can have it, To unsubscribe to this advices notifications click unsubscribe button.  ", author: "App's owner Osama", date: Date.now(), language: "en" })
const resubscribing = JSON.stringify({ _id: "subscribe", text: "You are no longer receiving Notifications, to re-subscribe again please press the subscribe button.", author: "App's owner Osama", date: Date.now(), language: "en" })

/**
 * firstc
 */

const url =
  "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/advice?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db("life")
    const collection = db.collection("advices")
    const subscribersCollection = db.collection("subscribers")
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

    const sendNotification = (subscription, data) => {
      webpush.sendNotification(subscription, data)
        .then(result => console.log(result))
        .catch(e => console.error(e.stack))
    }

    async function unsubscribe(subscription) {
      subscribersCollection.findOneAndDelete(subscription).then((result) => {
        sendNotification(subscription, resubscribing)
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    }

    async function getAllSubscribers() {
      return await subscribersCollection.find().toArray()
    }


    // a function to send notification to all subscribers
    // @array paramaeter is an array of subscribers
    // fetch random quote every x seconds
    // get all subscribers 
    // send the quote to every subscriber's endpoint
    setInterval(async () => {
      random().then(advice => {
        console.log("iam advice hello", advice[0]);

        getAllSubscribers().then((subs) => {
          subs?.map(sub => {
            console.log("iam sub hello", sub);
            webpush.sendNotification(sub, JSON.stringify(advice[0]))
              .then(result => console.log(result))
              .catch(e => console.error(e.stack))
          })
        })
      })

    }, 1000 * 60)



    app.get('/', (req, res) => {
      res.send('Hello world!')
    })

    app.get('/random', (req, res) => {
      random().then((array) => {
        res.send(array[0])
        // console.log(array[0], "random doc");
      }).catch(err => {
        console.error(err);
      })
    })

    app.get('/multiple', (req, res) => {
      const skip = parseInt(req.query.skip.trim())
      const limit = parseInt(req.query.limit)
      multiple(skip, limit).then((array) => {
        res.send(array)
        console.log(array, "10 docs");
        console.log(req.query);
      }).catch(err => {
        res.send('s')
      })
    })

    app.post('/subscribe', (req, res) => {
      const subscription = req.body
      // first make sure no dublicate
      subscribersCollection.findOne(subscription, {}, (err, res) => {
        if (err) console.error(err);
        if (res) {
          // if the doc is already saved just exit
          console.log('doc is found', res);
          return;
        } else {
          // if doc not found then add it 
          console.log('doc not found and will be inserted');
          subscribersCollection.insertOne(subscription).then((result) => {
            console.log(result);
          }).catch((err) => {
            console.error(err);
          });
          // send wellcoming message
          webpush.sendNotification(subscription, wellcoming)
            .then(result => console.log(result))
            .catch(e => console.log("error ", e.stack))
        }
      })
    })

    app.post('/unsubscribe', (req, res) => {
      const subscription = req.body
      // first make sure no dublicate
      unsubscribe(subscription)
    })

  }).catch(err => {
    console.error(err);
  });

app.get('/sub', (req, res) => {
  console.log("iam sub hellossssssssssssssssss", req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/**
 const getRandomAdvice = () => {
        let advice;
        random().then((array) => {
          advice = array[0]
          // res.send(array[0])
        }).catch(err => {
          console.log(err);
        })
        return advice
      }

      console.log(getRandomAdvice());


      var http = require("http");
setInterval(function() {
    http.get("http://<your app name>.herokuapp.com");
}, 300000); // every 5 minutes (300000)

function notifyAll(subscribers = []) {

      subscribers?.map((endpoint) => {
        // endpoint is subscription details
        // console.log(endpoint);
      })
      res.send(subscribers)
    }
 */