const express = require('express')
const cors = require('cors')
const fs = require('fs')
const http = require('http')
const https = require('https')

const server = express()

server.use(cors({
	origin: 'https://localhost:3000'
}))

server.post('/authn/facebook', (request, response) => {
	response.send(`Tried to authenticate with request ${request}`)
	console.log(`Tried to authenticate with request ${request}`)
})

const portHTTP = 3003

function onStartHTTP() {
	console.log(`HTTP server listening on http://localhost:${portHTTP}.`)
}

http.createServer(server).listen(portHTTP, onStartHTTP)
