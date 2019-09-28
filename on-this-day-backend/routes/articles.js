/**
 * @todo Document.
 */

const router = require('express').Router()
const mongodb = require('mongodb')

const authz = require('./utils/authz')
const errors = require('../utils/errors')


router.get('/articles', async (request, response, next) => {
	/**
	 * @todo Extract query parsing to an util function.
	 * @todo Implement query by keywords.
	 */

	try {
		let criteria = request.query
		for (var key in criteria)
			if (criteria.hasOwnProperty(key))
				criteria[key] = Number(criteria[key])

		let matchedArticles = await request.app.locals.articles.getArticles(criteria)
		matchedArticles = await matchedArticles.toArray()

		return response.send(matchedArticles)
	} catch (error) {
		return next(error)
	}
})


/**
 * @todo Implement separate "creation date" and "about date".
 * @todo Implement rich text parsing.
 */

router.post('/articles/add-article', authz, async (request, response, next) => {
	try {
		let articleData = request.body
		articleData.authorID = request.authnData.userID

		const info = await request.app.locals.articles.addArticle(articleData)
		if (!info.result.ok) throw new errors.RequestHandlingError(500, 'Failed to insert a new article!')

		return response.send({_id: info.insertedId})
	} catch(error) {
		return next(error)
	}
})

router.get('/articles/article-:id', async (request, response, next) => {
	try {
		const article = await request.app.locals.articles.getArticle(request.params.id)
		if (!article) throw new errors.ArticleNotFound(request.params.id)

		return response.send(article)
	} catch(error) {
		return next(error)
	}
})


/**
 * @todo Implement.
 */

router.get('/articles/article-:id/data', async (request, response, next) => {

})

router.post('/articles/article-:id/edit', authz, (request, response, next) => {
	try {
		const info = request.app.locals.articles.editArticle(request.params.id, request.body)

		if (info.matchedCount !== 1) throw new errors.ArticleNotFound(request.params.id)

		return response.status(204).end()
	} catch (error) {
		return next(error)
	}
})


/**
 * @todo Implement.
 */

router.get('/articles/article-:id/reviews', async (request, response, next) => {

})


/**
 * @todo Extract DB code to separate module.
 */

router.post('/articles/article-:id/add-review', authz, async (request, response, next) => {
	const db = request.app.locals.db

	/**
	 * @todo Validate data.
	 */

	db.collection('articles').updateOne({
		_id: new mongodb.ObjectID(request.params.id)
	}, {
		$push: {
			reviews: {
				author: new mongodb.ObjectID(request.authnData.userID),
				date: new Date(),
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
