'use strict'
const S = require('sanctuary')

const formatMonth = month => (month + 1).toString().padStart(2, '0')
const formatDate = date => `${date.getFullYear()}-${formatMonth(date.getMonth())}-${date.getDate()}`

const checkKeyWords = str => str.includes('asteroid') && str.includes('close')

module.exports = str => {
	if (checkKeyWords(str)) {
		return S.Maybe.Just({
			start: formatDate(new Date()),
			end: formatDate(new Date())
		})
	} else {
		return S.Maybe.Nothing
	}
}
