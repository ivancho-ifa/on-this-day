const router = require('express').Router()
const ObjectID = require('mongodb').ObjectID


router.get('/users', (request, response) => {
	const db = request.app.locals.db

	db.collection('users').find({}, { projection: { _id: true }}).toArray((error, usersIDs) => {
		if (error) {
			response.sendStatus(500)
			return console.error(error)
		}

		response.send(usersIDs)
	})
})

router.get('/users/user-:id', (request, response) => {
	const db = request.app.locals.db

	db.collection('users').findOne({_id: new ObjectID(request.params.id)}, (error, user) => {
		if (error) {
			response.sendStatus(500)
			return console.error(error)
		}

		if (!user) {
			response.status(404).send(`User with ID ${request.params.id} not found!`)
			return
		}

		response.send(user)
	})
})


module.exports = router
