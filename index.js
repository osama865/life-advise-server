const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const webpush = require('web-push')
const schedule = require('node-schedule')
const { MongoClient } = require("mongodb");
const express = require('express');
var https = require("https");
const app = express()
dotenv.config()

const rule = new schedule.RecurrenceRule()
rule.hour = 6;
rule.minute = 5;



app.use(bodyParser.json())
const port = process.env.PORT || 3002

// keep alive
/**
 * setInterval(function () {
    https.get("https://life-advise-server.herokuapp.com/");
}, 1200000); // every 20 minutes (1200000)

 */
// 8 hours
const time = 1000 * 60 * 60;

/**
 function generateVAPIDKeys() {
   const vapidKeys = webpush.generateVAPIDKeys();
   
   return {
     publicKey: vapidKeys.publicKey,
     privateKey: vapidKeys.privateKey,
    };
  }
  Hey,
my application is https://life-advise-server.herokuapp.com/
  this app is hosted on heruko, the free plan and the account isn't verified yet (didn't add a credit card)
  it's working good and everything, except Sudanese can not access the app, due to sanctions on Sudan.
I found this info in your policy and terms https://www.heroku.com/policy/heroku-elements-terms

1.4 Export Laws. The Heroku Elements and derivatives thereof may be subject to export laws and regulations of the United States and other jurisdictions. You represent that you are not named on any U.S. government denied-party list and will not permit any user to access or use any Heroku Elements in a U.S.-embargoed country or region (currently Cuba, Iran, North Korea, Sudan, Syria or Crimea) or in violation of any U.S. export law or regulation.  not permit any user to access or use any Heroku Elements in the U.S.
  -embargoed country or region (currently Cuba, Iran, North Korea, Sudan, Syria or Crimea) 
  or in violation of any U.S. export law or regulation. 
  
  all my app do is fetching data and sending notifications, this data does not involve any criminal work or any political issues

how can I make my app available for Sudan? 
Thanks.
  save it in db
  */
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT || "mailto:osama0000ibrahim@gmail.com", process.env.PUBLIC_VAPID_KEY || "BAHPN9XNOB9KiLT7KCnxZoJN8mLkMpG-PhNvLQShm91boF93h9RQiXY96XTTTwyRjAB6TLknbjs_Zpoohwtg-Uk", process.env.PRIVATE_VAPID_KEY || "3aGkYcoaidNC-7FG9BcFkDjsHyp9L5f8a9qcqtQg1c4")

app.use(cors({
    origin: "*"
}))
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

app.get('/push', (req, res) => {
    res.send('its the sign to push notifications to our lovley users!')
})

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

        async function multiple({skip, limit}) {
            const arr = collection.find().skip(skip).limit(limit)
            return await arr.toArray();
        }

        async function removeSubscripers() {
            let count;
            subscribersCollection.deleteMany().then(result => {
                count = result.deletedCount
                console.log(result.deletedCount);
            })
            return count
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
        }, 1000 * 60 * 60 * 8)
        /*
         const job = schedule.scheduleJob('50 * /3 * * *', function () {
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
        });
        job.invoke()
        */

        app.get('/', (req, res) => {
            res.send('Hello world!')
        })

        app.get('/push', (req, res) => {
            res.send('its the sign to push notifications to our lovley users!')
        })

        app.get('/random', (req, res) => {
            random().then((array) => {
                res.send(array[0])
                // console.log(array[0], "random doc");
            }).catch(err => {
                console.error(err);
            })
        })

        app.post('/multiple', (req, res) => {
            console.log(req.body);

            multiple(req.body).then((array) => {
                res.send(array)
                console.log(array, "10 docs");
                console.log(req.query);
            }).catch(err => {
                res.send('s')
            })
        })

        app.post('/subscribe', (req, response) => {
            const subscription = req.body
            // first make sure no dublicate
            console.log(subscription , req, 'ssssssssssssssssssss');
            subscribersCollection.findOne(subscription, {}, (err, res) => {
                if (err) console.error(err);
                if (res) {
                    // if the doc is already saved just exit
                    console.log('doc is found', res);
                    response.send("you are already subscribe to notifications!")
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
                        .then(result => {
                            response.send("Your now subscribed")
                            console.log(result)
                        })
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
/**
 * https://life-advise-server.herokuapp.com/
  server for https://life-advise.netlify.app/
  this server hosted on heruko, the free plan and the account is't vervied yet (didn't add credit card)
  it's working good and everything, ecept sudanese can not access the server, due to sanctions on sudan
  1.4 Export Laws.
  The Heroku Elements and derivatives thereof may be subject to export laws and regulations of the United States
  and other jurisdictions. You represent that you are not named on any U.S.
  government denied-party list and will not permit any user to access or use any Heroku Elements in a U.S.
  -embargoed country or region (currently Cuba, Iran, North Korea, Sudan, Syria or Crimea)
  or in violation of any U.S. export law or regulation.

  all my server is doing is fetching data and send notification, this data do not envolv with any criminal work
  or any politicion proplems
*/