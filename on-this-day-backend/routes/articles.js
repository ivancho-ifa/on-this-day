const router = require('express').Router()
const ObjectID = require('mongodb').ObjectID

const authz = require('./utils/authz')
const errors = require('./utils/errors')
const utils = require('./utils')


router.get('/articles', (request, response, next) => {
	const db = request.app.locals.db

	const query = utils.filtersToDBQuery(request.query)

	db.collection('articles').find(query, { projection: { _id: true }}).toArray((error, articlesIDs) => {
		if (error) return next(error)

		response.send(articlesIDs)
	})
})

router.post('/articles/add-article', authz, (request, response, next) => {
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
		date: {
			date: today.getDate(),
			month: today.getMonth() + 1,
			year: today.getFullYear()
		}
	}, (error, result) => {
		if (error) return next(error)
		if (!result.ok) return next(new errors.RequestHandlingError(500, 'Failed to insert a new article!'))

		return response.send({_id: result.insertedId})
	})
})

router.get('/articles/article-:id', (request, response, next) => {
	const db = request.app.locals.db

	db.collection('articles').findOne({_id: new ObjectID(request.params.id)}, (error, article) => {
		if (error) return next(error)
		if (!article) return next(new errors.ArticleNotFound(request.params.id))

		return response.send(article)
	})
})

router.post('/articles/article-:id/edit', authz, (request, response, next) => {
	const db = request.app.locals.db

	db.collection('articles').updateOne({
		_id: new ObjectID(request.params.id)
	}, {
		$set: request.body
	}, (error, result) => {
		if (error) return next(error)
		if (result.matchedCount !== 1) return next(new errors.ArticleNotFound(request.params.id))

		return response.status(204).end()
	})
})

router.post('/articles/article-:id/add-review', authz, (request, response, next) => {
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
		if (error) return next(error)
		if (!result.result.ok) return next(new errors.ArticleNotFound(request.params.id))

		return response.status(204).end()
	})
})


module.exports = router
