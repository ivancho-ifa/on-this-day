const express = require('express')
const cors = require('cors')
const http = require('http')

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

const portHTTP = 3003

function onStartHTTP() {
	console.log(`HTTP server listening on http://localhost:${portHTTP}.`)
}

http.createServer(server).listen(portHTTP, onStartHTTP)
