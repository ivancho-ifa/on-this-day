const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')

/** @todo Remove these when not testing individual components anymore */
const TEST_ARTICLES = require('./__test__/mock/articles.json')

const FILTERS = {
	date: function(date, article) {
		return new Date(article.date).getDate() === Number(date)
	},

	month: function(month, article) {
		return new Date(article.date).getMonth() === Number(month)
	},

	year: function(year, article) {
		return new Date(article.date).getFullYear() === Number(year)
	},

	keywords: function(keywords, article) {
		const articleContent = article.content

		/** True if some paragraph contains some keyword. */
		return articleContent.some(
			(paragraph) => keywords.some(
				(keyword) => paragraph.search(keyword) !== -1))
	}
}

function FILTER_TEST_ARTICLES(filters) {
	return Object.keys(TEST_ARTICLES).filter(
		articleID => {
			const article = TEST_ARTICLES[articleID]

			return (
				Object.keys(filters).every(key => {
					const filter = FILTERS[key]
					const criteria = filters[key]

					return filter(criteria, article)
				}))
		})
}

function isEmptyObject(object) {
	return Object.entries(object).length === 0 && object.constructor === Object
}


const server = express()

server.use(bodyParser.json())

server.use(cors({
	origin: 'https://localhost:3000'
}))

server.post('/authn/facebook', (request, response) => {
	if (false /** @todo Implement access token is not valid. */) {
		response.sendStatus(401)
	} else {
		response.sendStatus(200)
	}
})

server.get('/articles/article-:id', (request, response) => {
	response.send(TEST_ARTICLES[request.params.id])
})

server.get('/articles', (request, response) => {
	const filters = request.query

	if (!!filters && !isEmptyObject(filters)) {
		if (filters.keywords) {
			filters.keywords = JSON.parse(filters.keywords)
		}

		const matchedIDs = FILTER_TEST_ARTICLES(filters)
		response.send(matchedIDs)

		console.debug(`filtering: ${JSON.stringify(filters)} => ${JSON.stringify(matchedIDs)}`)
	} else {
		response.send(Object.keys(TEST_ARTICLES))
	}
})

const portHTTP = 3003

function onStartHTTP() {
	console.log(`HTTP server listening on http://localhost:${portHTTP}.`)
}

http.createServer(server).listen(portHTTP, onStartHTTP)
