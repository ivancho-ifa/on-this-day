const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')

/** @todo Remove these when not testing individual components anymore */
const testArticles = require('./__test__/mock/articles.json')

const filters = {
	date: function(date, article) {
		const articleDate = new Date(article.date).getDate()
		return articleDate == date
	},
	month: function(month, article) {
		const articleMonth = new Date(article.date).getMonth()
		return articleMonth == month
	},
	year: function(year, article) {
		const articleYear = new Date(article.date).getFullYear()
		return articleYear == year
	},
	keywords: function(keywords, article) {
		const articleContent = article.content

		return articleContent.some(
			(paragraph) => keywords.some(
				(keyword) => paragraph.search(keyword) !== -1))
	}
}

function filterTestArticles(filter) {
	let articleIDs = []

	for (const articleID in testArticles) {
		if (testArticles.hasOwnProperty(articleID)) {
			const article = testArticles[articleID]

			for (const key in filter) {
				if (filter.hasOwnProperty(key) && filter[key]) {
					const filterMethod = filters[key]
					const condition = filter[key]

					if (filterMethod(condition, article)) {
						articleIDs.push(articleID)

						break
					}
				}
			}
		}
	}

	return articleIDs
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

	console.debug(request)
})

server.get('/articles/article-:id', (request, response) => {
	response.send(testArticles[request.params.id])
})

server.get('/articles', (request, response) => {
	response.send(Object.keys(testArticles))
})

server.post('/articles/filter', (request, response) => {
	const filter = request.body
	if (filter.keywords) {
		filter.keywords = JSON.parse(filter.keywords)
	}

	console.log(filter)

	const matchedIDs = filterTestArticles(filter)
	response.send(matchedIDs)

	console.debug(matchedIDs)
})

const portHTTP = 3003

function onStartHTTP() {
	console.log(`HTTP server listening on http://localhost:${portHTTP}.`)
}

http.createServer(server).listen(portHTTP, onStartHTTP)
