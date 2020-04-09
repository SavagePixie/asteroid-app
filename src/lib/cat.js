'use strict'
const S = require('sanctuary')

const request = require('lib/request')

const opts = {
	host: 'catfact.ninja',
	path: '/fact',
}

module.exports = () => request(opts)
	.then(S.pipe([
		S.prop('body'),
		JSON.parse,
		S.prop('fact'),
	]))