'use strict'

const Left = x => ({
	chain: _f => Left(x),
	map: _f => Left(x),
	fold: (f, _g) => f(x),
	inspect: () => `Left(${x})`,
	trace: t => {
		console.log(`${t}: Left(${x})`)
		return Left(x)
	}
})

const Right = x => ({
	chain: f => f(x),
	map: f => Right(f(x)),
	fold: (_f, g) => g(x),
	inspect: () => `Right(${x})`,
	trace: t => {
		console.log(`${t}: Right(${x})`)
		return Right(x)
	}
})

const fromNullable = x => x != null ? Right(x) : Left(null)

module.exports = {
	fromNullable,
	Left,
	Right,
}