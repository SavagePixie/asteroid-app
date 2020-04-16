'use strict'
const Either = require('lib/Either')

const dateEx = /(?:on)?\s(\w{1,4}(?:-|\/|\s)\w{1,3}(?:-|\/|\s)\d{1,4})/

const formatMonth = month => (month + 1).toString().padStart(2, '0')
const formatDate = date => `${date.getFullYear()}-${formatMonth(date.getMonth())}-${date.getDate()}`

const checkKeyWords = str => str.includes('asteroid') && str.includes('close')
	? Either.Right(str)
	: Either.Left(null)

const matchDate = str => dateEx.test(str)
	? str.match(dateEx)[1]
	: Date.now()

const parseDate = str => new Date(str) == 'Invalid Date'
	? Either.Left(null)
	: Either.Right(new Date(str))

const buildObject = date => ({
	start: formatDate(date),
	end: formatDate(date),
})

module.exports = str =>
	checkKeyWords(str)
		.map(matchDate)
		.chain(parseDate)
		.map(buildObject)
		.fold(
			() => ({ result: 'notOk' }),
			x => ({
				result: 'ok',
				payload: x,
			})
		)
