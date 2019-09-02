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



const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const DB_URI = "mongodb+srv://IvanMollov:y3wBqxB10O@onthisday-gruiq.mongodb.net/on-this-day?retryWrites=true&w=majority"
const CLIENT = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


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

CLIENT.connect(error => {
	if (error) throw error

	const DB = CLIENT.db("on-this-day")

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
			// response.send(Object.keys(TEST_ARTICLES))
			DB.collection('articles').find({}, { projection: { _id: true } }).toArray((error, articlesIDs) => {
				response.send(articlesIDs)
			})
		}
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
