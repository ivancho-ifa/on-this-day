const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const server = require('express')()


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

/*
 * } Sets-up middleware.
 * -----------------------------------------------------------------------------
 */


/*
 * -----------------------------------------------------------------------------
 * Starts server. {
 */

const dbURI = "mongodb+srv://IvanMollov:y3wBqxB10O@onthisday-gruiq.mongodb.net/on-this-day?retryWrites=true&w=majority"

const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect(error => {
	if (error) return console.error(error)

	server.locals.db = client.db("on-this-day")

	server.listen(3003, () => {
		console.log("HTTP server listening on http://localhost:3003.")
	})
})

/*
 * } Starts server.
 * -----------------------------------------------------------------------------
 */
