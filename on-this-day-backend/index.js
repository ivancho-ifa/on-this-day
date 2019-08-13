const express = require('express')
const server = express()

server.post('/login', (request, response) => response.send('Logging in!'))

const port = 3003
server.listen(port, () => console.log(`Listening on ${port}`))
