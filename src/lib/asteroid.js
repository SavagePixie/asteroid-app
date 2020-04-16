'use strict'
const R = require('ramda')

const request = require('lib/request')
const { formatNumber, take } = require('lib/helper')

const getAsteroidInfo = num => R.pipe(
	take(num),
	R.map(writeInfo)
)

const parseAsteroids = R.map(x => ({
	name: x.name,
	approachDate: x.close_approach_data[0].close_approach_date_full,
	dangerous: x.is_potentially_hazardous_asteroid,
	distance: +x.close_approach_data[0].miss_distance.kilometers,
	eDiameter: {
		min: x.estimated_diameter.meters.estimated_diameter_min,
		max: x.estimated_diameter.meters.estimated_diameter_max,
	},
	speed: +x.close_approach_data[0].relative_velocity.kilometers_per_second,
	url: x.nasa_jpl_url,
}))

const parseResponse = ({ near_earth_objects: objs }) => Object
	.keys(objs)
	.flatMap(x => parseAsteroids(objs[x]))
	.sort((a, b) => a.distance - b.distance)

const writeInfo = asteroid =>
`*${asteroid.name}*
Earth approach: ${asteroid.approachDate}.
Speed: ${formatNumber(asteroid.speed, 2)} km/s.
Passing ${formatNumber(asteroid.distance, 1)} kilometers away from Earth.
It is${asteroid.dangerous ? ' ' : ' not '}potentially dangerous.
Its estimated diameter is between ${formatNumber(asteroid.eDiameter.min, 2)} and ${formatNumber(asteroid.eDiameter.max, 2)} meters.
_For more info, check ${asteroid.url}_`

module.exports = ({ host, path, key }) => ({ start, end }) => request({
	host,
	path: `${path}?start_date=${start}&end_date=${end}&api_key=${key}`
}).then(R.pipe(
	R.prop('body'),
	JSON.parse,
	parseResponse,
	getAsteroidInfo(1),
))
