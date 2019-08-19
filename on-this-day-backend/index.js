const express = require('express')
const cors = require('cors')
const http = require('http')

const server = express()

server.use(cors({
	origin: 'https://localhost:3000'
}))

server.post('/authn/facebook', (request, response) => {
	response.send(`[Debug] Succesfully handled request to ${request.url}`)
	console.debug(request)
})

const portHTTP = 3003

function onStartHTTP() {
	console.log(`HTTP server listening on http://localhost:${portHTTP}.`)
}

http.createServer(server).listen(portHTTP, onStartHTTP)
