'use strict'
const R = require('ramda')
const bodyParser = require('body-parser')
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
const parseRequest = require('lib/parseRequest')

const { addText, downcase, questionify } = require('lib/helper')

const twiClient = new twilio(conf.twilioSid, conf.twilioToken)

const formatCatFact = R.pipe(
	downcase,
	questionify,
	addText('Sorry, I didn\'t understand your request, but did you know that')
)

const apiCalls = {
	ok: asteroid,
	notOk: cat,
}

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api', (req, res) => {
	const { result, payload } = parseRequest(req.body.request)
	apiCalls[result](payload)
		.then(data => res.json(data))
})

app.listen(conf.port, () => {
	console.log(`Listening on port ${conf.port}`)
})