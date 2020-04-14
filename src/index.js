'use strict'
const R = require('ramda')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const twilio = require('twilio')

const asteroid = require('lib/asteroid')({
	host: process.env.NASA_HOST,
	path: process.env.NASA_PATH,
	key: process.env.NASA_API_KEY,
})
const cat = require('lib/cat')
const parseRequest = require('lib/parseRequest')

const { addText, downcase, questionify } = require('lib/helper')

const twiClient = new twilio(
	process.env.TWILIO_SID,
	process.env.TWILIO_TOKEN
)

const formatCatFact = R.pipe(
	downcase,
	questionify,
	addText('Sorry, I didn\'t understand your request, but did you know that'),
	x => [ x ]
)

const apiCalls = {
	ok: asteroid,
	notOk: () => cat().then(formatCatFact),
}

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.status(200).json({"result":"hi"})
})

app.post('/api', (req, res) => {
	console.log(req.body)
	const { result, payload } = parseRequest(req.body.request)
	apiCalls[result](payload)
		.then(data => res.json(data))
})

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`)
})