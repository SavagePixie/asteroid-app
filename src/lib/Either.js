'use strict'

const Left = x => ({
	chain: _f => Left(x),
	map: _f => Left(x),
	fold: (f, _g) => f(x),
	inspect: () => `Left(${x})`,
})

const Right = x => ({
	chain: f => f(x),
	map: f => Right(f(x)),
	fold: (_f, g) => g(x),
	inspect: () => `Right(${x})`,
})

module.exports = {
	Left,
	Right,
}