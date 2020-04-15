'use strict'
const {
	NASA_HOST: host,
	NASA_PATH: path,
	NASA_API_KEY: key
} = process.env

const R = require('ramda')

const asteroid = require('lib/asteroid')({ host, path, key })
const cat = require('lib/cat')
const { addText, downcase, questionify } = require('lib/helper')

const formatCatFact = R.pipe(
	downcase,
	questionify,
	addText('Sorry, I didn\'t understand your request, but did you know that'),
	x => [ x ]
)

module.exports = {
	ok: asteroid,
	notOk: () => cat().then(formatCatFact),
}
