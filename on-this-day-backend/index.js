/**
 * @todo Document.
 */

const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const server = require('express')()

const config = require('./config')
const errorHandlers = require('./utils/errorHandlers')

const db = require('./db')


/*
 * -----------------------------------------------------------------------------
 * Sets-up middleware. {
 */

server.use(bodyParser.json())

server.use(cookieParser())

server.use(cors({
	origin: 'https://localhost:3000',
	credentials: true
}))

server.use(require('./routes'))


server.use(errorHandlers.log)

server.use(errorHandlers.respond)

/*
 * } Sets-up middleware.
 * -----------------------------------------------------------------------------
 */


/*
 * -----------------------------------------------------------------------------
 * Starts server. {
 */

const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(config.mongoConnectionURI, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect(error => {
	if (error) return console.error(error)

	server.locals.db = client.db("on-this-day")
	server.locals.articles = new db.articles(server.locals.db.collection('articles'))

	server.listen(3003, () => {
		console.log("HTTP server listening on http://localhost:3003.")
	})
})

/*
 * } Starts server.
 * -----------------------------------------------------------------------------
 */
