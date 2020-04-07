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

const twiClient = new twilio(conf.twilioSid, conf.twilioToken)
const app = express()

app.use(morgan('dev'))

asteroid('2020-04-17', '2020-04-24')
	.then(data => data[0])
	.then(console.log)
	.catch(console.error)

app.listen(conf.port, () => {
	console.log(`Listening on port ${conf.port}`)
})