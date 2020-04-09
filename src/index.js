'use strict'
const express = require('express')
const morgan = require('morgan')
const twilio = require('twilio')

const conf = require('../conf.json')
const asteroid = require('lib/asteroid')({
	host: conf.nasa.host,
	path: conf.nasa.path,
	key: conf.nasa.apiKey,
})
const cat = require('lib/cat')

const twiClient = new twilio(conf.twilioSid, conf.twilioToken)
const app = express()

app.use(morgan('dev'))

asteroid('2020-04-17', '2020-04-24')
	.then(console.log)
	.catch(console.error)

cat('Sorry, I didn\'t understand your request, but did you know that')
	.then(console.log)
	
app.listen(conf.port, () => {
	console.log(`Listening on port ${conf.port}`)
})