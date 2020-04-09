'use strict'
const S = require('sanctuary')

const request = require('lib/request')

const opts = {
	host: 'catfact.ninja',
	path: '/fact',
}

const charReplace = (expression, replace) => str => str.replace(expression, replace)
const downcase = charReplace(/^\w/, l => l.toLowerCase())
const questionify = charReplace('.', '?')

const addText = str1 => str2 => `${str1} ${str2}`

module.exports = text => request(opts)
	.then(S.pipe([
		S.prop('body'),
		JSON.parse,
		S.prop('fact'),
		downcase,
		questionify,
		addText(text),
	]))