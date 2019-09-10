const router = require('express').Router()
const ObjectID = require('mongodb').ObjectID

const utils = require('./utils')


router.get('/users', (request, response) => {
	const db = request.app.locals.db

	db.collection('users').find({}, { projection: { _id: true }}).toArray((error, usersIDs) => {
		if (error) return utils.handleDBError(error, response)

		response.send(usersIDs)
	})
})

router.get('/users/user-:id', (request, response) => {
	const db = request.app.locals.db

	db.collection('users').findOne({_id: new ObjectID(request.params.id)}, (error, user) => {
		if (error) return utils.handleDBError(error, response)

		if (user) response.send(user)
		else utils.respondAndLogError(response.status(404), `User with ID ${request.params.id} not found!`)
	})
})


module.exports = router
