'use strict'
const request = require('lib/request')

const parseAsteroids = obj => obj.map(x => ({
	id: x.id,
	approachDate: x.close_approach_data[0].close_approach_date_full,
	dangerous: x.is_potentially_hazardous_asteroid,
	distance: +x.close_approach_data[0].miss_distance.kilometers,
	eDiameter: {
		min: x.estimated_diameter.meters.estimated_diameter_min,
		max: x.estimated_diameter.meters.estimated_diameter_max,
	},
	speed: +x.close_approach_data[0].relative_velocity.kilometers_per_second,
}))

const parseResponse = ({ near_earth_objects: objs }) => Object
	.keys(objs)
	.flatMap(x => parseAsteroids(objs[x]))
	.sort((a, b) => a.distance - b.distance)

module.exports = ({ host, path, key }) => (start, end) => request({
	host,
	path: `${path}?start_date=${start}&end_date=${end}&api_key=${key}`
}).then(({ body }) => JSON.parse(body))
	.then(parseResponse)
