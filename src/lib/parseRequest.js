'use strict'
const Either = require('lib/Either')

const dateEx = /(?:^|\s)(\w{1,4}(?:-|\/|\s)\w{1,3}(?:-|\/|\s)\d{1,4})/g

const formatMonth = month => (month + 1).toString().padStart(2, '0')
const formatDate = date => `${date.getFullYear()}-${formatMonth(date.getMonth())}-${date.getDate()}`

const checkKeyWords = str => str.includes('asteroid') && str.includes('close')
	? Either.Right(str)
	: Either.Left(null)

const matchDate = str => dateEx.test(str)
	? str.match(dateEx)
	: [ Date.now() ]

const parseDate = arr => {
	const dates = arr.map(x => new Date(x))
	return dates.every(x => x != 'Invalid Date')
		? Either.Right(dates)
		: Either.Left(null)
}

const buildObject = ([ start, end = start ]) => ({
	start: formatDate(start),
	end: formatDate(end),
})

module.exports = str =>
	checkKeyWords(str.toLowerCase())
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
