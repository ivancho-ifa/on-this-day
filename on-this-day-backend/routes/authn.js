const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const router = require('express').Router()


const authz = require('./utils/authz')
const utils = require('./utils')

const SALT_ROUNDS = 10
/** @todo Don't keep it here! */
const SECRET = 'SUPERSECRET'


router.post('/authn', (request, response) => {
	const db = request.app.locals.db

	db.collection('users').findOne({ email: request.body.email }, { projection: { _id: true, password: true } }, (error, user) => {
		if (error) return utils.handleDBError(error, response)

		if (user)
			bcrypt.compare(request.body.password, user.password, (error, passwordMatch) => {
				if (error) return utils.respondAndLogError(response, 'Failed to compare hashes of passwords!', 500, error)

				if (passwordMatch) {
					const token = jwt.sign({ userID: user._id }, SECRET, { expiresIn: '1m' })
					response.cookie('token', token, { httpOnly: true }).end()
				} else utils.respondAndLogError(response.status(403), `Failed to authenticate user with ID ${user._id}`)
			})
		else utils.respondAndLogError(response.status(403), `Tried to authenticate with not existing user with mail ${request.body.email}`)
	})
})


/**
 * @todo Implement password strength requirements.
 */

router.post('/authn/sign-up', (request, response) => {
	const db = request.app.locals.db

	if (request.body.password !== request.body.passwordConfirmation)
		return utils.respondAndLogError(response.status(422), `Failed to create a new user with mail ${request.body.mail}! Password confirmation failed!`)

	bcrypt.hash(request.body.password, SALT_ROUNDS,
		async function(error, encryptedPassword) {
			if (error || !encryptedPassword) return utils.respondAndLogError(response, 'Failed to hash password!', 500, error)

			let hasUser = false
			try { hasUser = await db.collection('users').find({email: request.body.email}).count() !== 0 }
			catch(error) { utils.handleDBError(error, response) }

			if (!hasUser)
				db.collection('users').insertOne({
					email: request.body.email,
					password: encryptedPassword
				}, (error, result) => {
					if (error) return utils.handleDBError(error, response)

					if (result.result.ok) response.status(204).end()
					else utils.respondAndLogError(response.status(500), `Failed to create a new user with mail ${request.body.mail}`)
				})
			else utils.respondAndLogError(response.status(422), `Email ${request.body.email} is already signed-up!`)
		})
})


router.post('/authn/sign-out', authz, (request, response) => {
	response.clearCookie('token', { httpOnly: true }).end()
})


router.post('/authn/token-check', authz, (request, response) => {
	response.sendStatus(200)
})


module.exports = router
