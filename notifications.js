const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const webpush = require('web-push')

const app = express()

dotenv.config()

app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT || "mailto: osama0000ibrahim@gmail.com", process.env.PUBLIC_VAPID_KEY || "BAHPN9XNOB9KiLT7KCnxZoJN8mLkMpG-PhNvLQShm91boF93h9RQiXY96XTTTwyRjAB6TLknbjs_Zpoohwtg-Uk", process.env.PRIVATE_VAPID_KEY || "3aGkYcoaidNC-7FG9BcFkDjsHyp9L5f8a9qcqtQg1c4")

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.post('/subscribe', (req, res) => {
  const subscription = req.body

  console.log(subscription,'sub' ,req.body.id)

  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'It works.',
  })

  webpush.sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(e => console.log(e.stack))

  res.status(200).json({'success': true})
});

app.get('/sub', (req, res) => {
  console.log(req.body);
})

/*

 */


app.listen(3001, () => console.log('The server has been started on the port 3001'))