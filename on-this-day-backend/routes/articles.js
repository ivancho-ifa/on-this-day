const router = require('express').Router()
const ObjectID = require('mongodb').ObjectID

const authz = require('./utils/authz')
const utils = require('./utils')


router.get('/articles', (request, response) => {
	const db = request.app.locals.db

	const query = utils.filtersToDBQuery(request.query)

	db.collection('articles').find(query, { projection: { _id: true }}).toArray((error, articlesIDs) => {
		if (error) return utils.handleDBError(error, response)

		response.send(articlesIDs)
	})
})

router.post('/articles/add-article', authz, (request, response) => {
	const db = request.app.locals.db

	const today = new Date()

	/**
	 * @todo Author.
	 * @todo Rating.
	 */

	db.collection('articles').insertOne({
		title: request.body.title,
		titleImageSrc: request.body.titleImageSrc,
		titleImageCaption: request.body.titleImageCaption,
		subtitle: request.body.subtitle,
		content: request.body.content.split(/\n\r|\r\n|\n|\r/).filter(paragraph => paragraph !== ""),
		author: "Umen Pichaga",
		date: {
			date: today.getDate(),
			month: today.getMonth() + 1,
			year: today.getFullYear()
		},
		rating: 0,
		reviews: []
	}, (error, result) => {
		if (error) return utils.handleDBError(error, response)

		if (!result) {
			response.status(500).send(`Article with ID ${request.params.id} not found!`)
			return
		}

		response.send({_id: result.insertedId})
	})
})

router.get('/articles/article-:id', (request, response) => {
	const db = request.app.locals.db

	db.collection('articles').findOne({_id: new ObjectID(request.params.id)}, (error, article) => {
		if (error) return utils.handleDBError(error, response)

		if (!article) {
			response.status(404).send(`Article with ID ${request.params.id} not found!`)
			return
		}

		response.send(article)
	})
})

router.post('/articles/article-:id/edit', authz, (request, response) => {
	const db = request.app.locals.db

	db.collection('articles').updateOne({
		_id: new ObjectID(request.params.id)
	}, {
		$set: request.body
	}, (error, result) => {
		if (error) return utils.handleDBError(error, response)
		if (result.matchedCount !== 1) return response.status(404).send(`User with ID ${request.params.id} not found!`) && console.error(`User with ID ${request.params.id} not found!`)

		response.status(204).end()
	})
})

router.post('/articles/article-:id/add-review', authz, (request, response) => {
	const db = request.app.locals.db

	const today = new Date()

	/**
	 * @todo Get author from token.
	 * @todo Validate data.
	 */

	db.collection('articles').updateOne({
		_id: new ObjectID(request.params.id)
	}, {
		$push: {
			reviews: {
				author: "Nqkoi Pichaga",
				date: {
					date: today.getDate(),
					month: today.getMonth() + 1,
					year: today.getFullYear()
				},
				rating: request.body.rating,
				title: request.body.title,
				review: request.body.review
			}
		}
	}, (error, result) => {
		if (error) return utils.handleDBError(error, response)

		if (!result) {
			response.status(404).send(`Article with ID ${request.params.id} not found!`)
			return
		}

		response.sendStatus(200)
	})
})


module.exports = router
