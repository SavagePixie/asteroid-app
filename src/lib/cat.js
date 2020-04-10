'use strict'
const R = require('ramda')

const request = require('lib/request')

const opts = {
	host: 'catfact.ninja',
	path: '/fact',
}

module.exports = () => request(opts)
	.then(R.pipe(
		R.prop('body'),
		JSON.parse,
		R.prop('fact'),
		x => [ x ]
	))