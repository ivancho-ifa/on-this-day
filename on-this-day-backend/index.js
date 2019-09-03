const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID


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

/** @todo Move to utils. */

function isEmptyObject(object) {
	return Object.entries(object).length === 0 && object.constructor === Object
}

function filtersToDBQuery(filters) {
	let query = {}

	// If no filters, return empty query.
	if (!filters || isEmptyObject(filters)) {
		return query
	}

	// Add each filter to the query.
	if (filters.date) {
		query['date.date'] = Number(filters.date)
	}
	if (filters.month) {
		query['date.month'] = Number(filters.month)
	}
	if (filters.year) {
		query['date.year'] = Number(filters.year)
	}
	if (filters.keywords) {
		/** @todo Add search by keywords. */
	}

	return query
}

const DB_URI = "mongodb+srv://IvanMollov:y3wBqxB10O@onthisday-gruiq.mongodb.net/on-this-day?retryWrites=true&w=majority"
const CLIENT = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

CLIENT.connect(error => {
	if (error) throw error

	const DB = CLIENT.db("on-this-day")

	server.get('/articles', (request, response) => {
		const query = filtersToDBQuery(request.query)

		DB.collection('articles').find(query, { projection: { _id: true }}).toArray((error, articlesIDs) => {
			response.send(articlesIDs)
		})
	})

	server.get('/articles/article-:id', (request, response) => {
		DB.collection('articles').findOne({_id: new ObjectID(request.params.id)}, (error, article) => {
			if (error) throw error

			response.send(article)
		})
	})

	server.listen(3003, () => {
		console.log("HTTP server listening on http://localhost:3003.")
	})
})
