'use strict'
const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const MsgResponse = require('twilio').twiml.MessagingResponse

const callApi = require('lib/callApi')
const parseRequest = require('lib/parseRequest')

const app = express()

app.use(morgan('dev'))
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: [ "'self'" ],
		},
	},
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.status(200).json({ response: 'Hi there!' })
})

app.post('/api', (req, res) => {
	const twiml = new MsgResponse()
	const { result, payload } = parseRequest(req.body.Body)

	callApi[result](payload)
		.then(data => {
			data.forEach(x => twiml.message(x))
			res.status(200)
			res.set({ 'Content-Type': 'text/xml' })
			res.send(twiml.toString())
		})
		.catch(_err => {
			twiml.message('Oops! It looks like we\'re having some issues. Please, try again later.')
			res.status(500)
			res.set({ 'Content-Type': 'text/xml' })
			res.send(twiml.toString())
		})
})

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`)
})