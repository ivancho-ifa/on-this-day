const express = require('express')
const cors = require('cors')
const http = require('http')

/** @todo Remove these when not testing individual components anymore */
const testArticles = require('./__test__/mock/articles.json')

const server = express()

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

	console.debug(testArticles[request.params.id])
})

server.get('/articles', (request, response) => {
	const allArticlesIDs = Object.keys(testArticles)
	response.send(allArticlesIDs)

	console.debug(allArticlesIDs)
})

const portHTTP = 3003

function onStartHTTP() {
	console.log(`HTTP server listening on http://localhost:${portHTTP}.`)
}

http.createServer(server).listen(portHTTP, onStartHTTP)
