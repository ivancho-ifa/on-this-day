const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const router = require('express').Router()


const authz = require('./utils/authz')
const config = require('../config')
const errors = require('./utils/errors')

const SALT_ROUNDS = 10


router.post('/authn', (request, response, next) => {
	const db = request.app.locals.db

	db.collection('users').findOne({ email: request.body.email }, { projection: { _id: true, password: true } }, (error, user) => {
		if (error) return next(error)
		if (!user) return next(new errors.RequestHandlingError(403, `Unsuccessful attempt to authenticate with not existing user with mail ${request.body.email}`))

		bcrypt.compare(request.body.password, user.password, (error, passwordMatch) => {
			if (error) return next(error)
			if (!passwordMatch) return next(new errors.RequestHandlingError(403, `Failed to authenticate user with ID ${user._id}`))

			const token = jwt.sign({ userID: user._id }, config.JWTSecret, { expiresIn: '1m' })
			response.cookie('token', token, { httpOnly: true }).end()
		})
	})
})


/**
 * @todo Implement password strength requirements.
 */

router.post('/authn/sign-up', (request, response, next) => {
	const db = request.app.locals.db

	if (request.body.password !== request.body.passwordConfirmation)
		return next(new errors.RequestHandlingError(422, `Failed to create new user with email ${request.body.email}! Password confirmation failed!`))

	bcrypt.hash(request.body.password, SALT_ROUNDS,
		async function(error, encryptedPassword) {
			if (error) return next(error)
			if (!encryptedPassword) return next(new errors.RequestHandlingError(500, 'Failed to hash password!'))

			let hasUser = false
			try { hasUser = await db.collection('users').find({email: request.body.email}).count() !== 0
			} catch(error) { return next(error) }

			if (hasUser) return next(new errors.RequestHandlingError(422, `User with email ${request.body.email} is already signed-up!`))

			db.collection('users').insertOne({
				email: request.body.email,
				password: encryptedPassword
			}, (error, result) => {
				if (error) return next(error)
				if (!result.result.ok) return next(new errors.RequestHandlingError(500, `Failed to create new user with email ${request.body.email}`))

				response.status(204).end()
			})
		})
})


router.post('/authn/sign-out', authz, (request, response) => {
	response.clearCookie('token', { httpOnly: true }).end()
})


router.post('/authn/token-check', authz, (request, response) => {
	response.send(204).end()
})


module.exports = router
