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

		if (user) {
			bcrypt.compare(request.body.password, user.password, (error, isSame) => {
				if (error) {
					console.error(error)
					response.status(500).send(`Failed to compare hashes of passwords!`)
					return
				}

				if (isSame) {
					const token = jwt.sign({ userID: user._id }, SECRET, { expiresIn: '1m' })
					response.cookie('token', token, { httpOnly: true }).end()
				} else {
					response.status(403).send(`Failed to authenticate user with email ${request.body.email}`)
				}
			})
		} else {
			response.status(403).send(`Tried to authenticate with not existing user with mail ${request.body.email}`)
		}
	})
})


router.post('/authn/sign-up', (request, response) => {
	const db = request.app.locals.db

	bcrypt.hash(request.body.password, SALT_ROUNDS,
		async function(error, encryptedPassword) {
			if (error || !encryptedPassword) {
				response.status(500).send(`Failed to hash password!`)
				return console.error(error)
			}

			console.debug(encryptedPassword)

			let hasUser = false
			try {
				hasUser = await db.collection('users').find({email: request.body.email}).count() !== 0
			} catch(error) {
				utils.handleDBError(error, response)
			}

			if (!hasUser) {
				db.collection('users').insertOne({
					name: "Default Name",
					profileImage: "https://scontent.fsof9-1.fna.fbcdn.net/v/t1.0-9/10455452_507971199346971_4130574332384626599_n.jpg?_nc_cat=105&_nc_oc=AQkb34DKuP_g796kxyqjXs2C1wH0nl0zgVU0r01m36bYEEAJmOgVYuHmOFsjesxA4Rc&_nc_ht=scontent.fsof9-1.fna&oh=e4163ecc85bc8f4fbe54211869144bd1&oe=5E165BCE",
					email: request.body.email,
					password: encryptedPassword,
					bio: [
						"Default bio",
						"Default bio"
					]
				}, (error, result) => {
					if (error) return utils.handleDBError(error, response)

					if (result.result.ok) {
						response.status(204).end()
					} else {
						const errorMessage = `Failed to insert a new user with mail ${request.body.mail}`
						response.status(500).send(errorMessage)
						console.error(errorMessage)
					}
				})
			} else {
				response.status(422).send(`Email ${request.body.email} is already signed-up!`)
			}
		})
})


router.post('/authn/sign-out', authz, (request, response) => {
	response.clearCookie('token', { httpOnly: true }).end()
})


router.post('/authn/token-check', authz, (request, response) => {
	response.sendStatus(200)
})


module.exports = router
