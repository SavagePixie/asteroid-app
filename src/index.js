'use strict'
const express = require('express')
const morgan = require('morgan')
const twilio = require('twilio')

const conf = require('../conf.json')

const twiClient = new twilio(conf.twilioSid, conf.twilioToken)
const app = express()

app.use(morgan('dev'))



app.listen(conf.port, () => {
	console.log(`Listening on port ${conf.port}`)
})