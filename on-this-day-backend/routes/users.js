const router = require('express').Router()
const ObjectID = require('mongodb').ObjectID

const authz = require('./utils/authz')
const errors = require('../utils/errors')


router.get('/users', (request, response, next) => {
	const db = request.app.locals.db

	db.collection('users').find({}, { projection: { _id: true }}).toArray((error, usersIDs) => {
		if (error) return next(error)

		return response.send(usersIDs)
	})
})

router.get('/users/user-:id', (request, response, next) => {
	const db = request.app.locals.db

	db.collection('users').findOne({_id: new ObjectID(request.params.id)}, (error, user) => {
		if (error) return next(error)
		if (!user) return next(new errors.RequestHandlingError(404, `User with ID ${request.params.id} not found!`))

		return response.send(user)
	})
})

router.post('/users/user-:id/edit', authz, (request, response, next) => {
	const db = request.app.locals.db

	if (request.authnData.userID !== request.params.id)
		return next(new errors.RequestHandlingError(401))

	db.collection('users').updateOne({
		_id: new ObjectID(request.params.id)
	}, {
		$set: request.body
	}, (error, result) => {
		if (error) return next(error)
		if (result.matchedCount !== 1) return next(new errors.ArticleNotFound(request.params.id))

		return response.status(204).end()
	})
})


module.exports = router
