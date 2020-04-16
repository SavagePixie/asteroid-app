'use strict'

const addText = str1 => str2 => `${str1} ${str2}`

const charReplace = (expression, replace) => str => str.replace(expression, replace)
const downcase = charReplace(/^\w/, l => l.toLowerCase())
const addQuestion = charReplace('.', '?')
const questionify = str => str.includes('.')
	? addQuestion(str)
	: `${str}?`

const formatNumber = (num, decimals) => num.toLocaleString('en-GB', { maximumFractionDigits: decimals })

module.exports = {
	addText,
	downcase,
	formatNumber,
	questionify,
}