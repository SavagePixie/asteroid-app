'use strict'
const https = require('https')

module.exports = options => new Promise((resolve, reject) => {
	const opts = {
		...options,
		method: options.method || 'GET',
	}

	const req = https.request(opts, res => {
		let body = ''
		res.on('data', chunk => body += chunk)
		res.on('end', () => resolve({
			...res,
			body,
		}))
	})
	req.on('error', reject)
	if (body !== undefined) req.write(body)
	req.end()
})