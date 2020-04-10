'use strict'

const addText = str1 => str2 => `${str1} ${str2}`

const charReplace = (expression, replace) => str => str.replace(expression, replace)
const downcase = charReplace(/^\w/, l => l.toLowerCase())
const addQuestion = charReplace('.', '?')
const questionify = str => str.includes('.')
	? addQuestion(str)
	: `${str}?`

const take = num => list => list.slice(0, num)

module.exports = {
	addText,
	downcase,
	questionify,
	take,
}