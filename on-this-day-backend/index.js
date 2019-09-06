const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID


const authz = require('./authz')


const server = express()


server.use(bodyParser.json())

server.use(cookieParser())

server.use(cors({
	origin: 'https://localhost:3000'
}))


/** @todo Move to utils. */

function isEmptyObject(object) {
	return Object.entries(object).length === 0 && object.constructor === Object
}

function filtersToDBQuery(filters) {
	let query = {}

	// If no filters, return empty query.
	if (!filters || isEmptyObject(filters)) {
		return query
	}

	// Add each filter to the query.
	if (filters.date) {
		query['date.date'] = Number(filters.date)
	}
	if (filters.month) {
		query['date.month'] = Number(filters.month)
	}
	if (filters.year) {
		query['date.year'] = Number(filters.year)
	}
	if (filters.keywords) {
		/** @todo Add search by keywords. */
	}

	return query
}


const DB_URI = "mongodb+srv://IvanMollov:y3wBqxB10O@onthisday-gruiq.mongodb.net/on-this-day?retryWrites=true&w=majority"
const CLIENT = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const SALT_ROUNDS = 10
/** @todo Don't keep it here! */
const SECRET = 'SUPERSECRET'

CLIENT.connect(error => {
	if (error) throw error

	const DB = CLIENT.db("on-this-day")

	server.post('/authn', (request, response) => {
		DB.collection('users').findOne({email: request.body.email}, {projection: {password: true}}, (error, user) => {
			if (error) {
				response.sendStatus(500)
				return console.error(error)
			}

			if (user) {
				bcrypt.compare(request.body.password, user.password, (error, isSame) => {
					if (error) {
						console.error(error)
						response.status(500).send(`Failed to compare hashes of passwords!`)
						return
					}

					if (isSame) {
						const payload = { email: request.body.email }
						const token = jwt.sign(payload, SECRET, {
							expiresIn: '1h'
						})
						response.send({token})
					} else {
						response.status(403).send(`Failed to authenticate user with email ${request.body.email}`)
					}
				})
			} else {
				response.status(403).send(`Tried to authenticate with not existing user with mail ${request.body.email}`)
			}
		})
	})

	server.post('/authn/sign-up', (request, response) => {
		bcrypt.hash(request.body.password, SALT_ROUNDS,
			async function(error, encryptedPassword) {
				if (error || !encryptedPassword) {
					response.status(500).send(`Failed to hash password!`)
					return console.error(error)
				}

				console.debug(encryptedPassword)

				if (await DB.collection('users').find({email: request.body.email}).count() === 0) {
					DB.collection('users').insertOne({
						name: "Default Name",
						profileImage: "https://scontent.fsof9-1.fna.fbcdn.net/v/t1.0-9/10455452_507971199346971_4130574332384626599_n.jpg?_nc_cat=105&_nc_oc=AQkb34DKuP_g796kxyqjXs2C1wH0nl0zgVU0r01m36bYEEAJmOgVYuHmOFsjesxA4Rc&_nc_ht=scontent.fsof9-1.fna&oh=e4163ecc85bc8f4fbe54211869144bd1&oe=5E165BCE",
						email: request.body.email,
						password: encryptedPassword,
						bio: [
							"Default bio",
							"Default bio"
						]
					})
					response.sendStatus(200)
				} else {
					response.status(422).send(`Email ${request.body.email} is already signed-up!`)
				}
			})
	})

	server.post('/authn/token-check', authz, (request, response) => {
		response.sendStatus(200)
	})

	server.get('/users', (request, response) => {
		DB.collection('users').find({}, { projection: { _id: true }}).toArray((error, usersIDs) => {
			if (error) {
				response.sendStatus(500)
				return console.error(error)
			}

			response.send(usersIDs)
		})
	})

	server.get('/users/user-:id', (request, response) => {
		DB.collection('users').findOne({_id: new ObjectID(request.params.id)}, (error, user) => {
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

	server.get('/users/user-:id/edit-profile', authz, (request, response) => {
		DB.collection('users').findOne({_id: new ObjectID(request.params.id)}, {projection: { email: true }}, (error, user) => {
			if (error) {
				response.sendStatus(500)
				return console.error(error)
			}

			if (!user) {
				response.sendStatus(404)
				return
			}

			console.debug(`user.email: ${user.email}, request.email: ${request.email}`)

			if (user.email !== request.email) {
				response.sendStatus(401)
				return
			}

			let updateSpec = {}
			if (request.body.name) updateSpec.name = request.body.name
			if (request.body.profileImage) updateSpec.profileImage = request.body.profileImage
			if (request.body.bio) updateSpec.bio = request.body.bio

			DB.collection('users').updateOne({
				_id: new Object(request.params.id)
			}, {
				$set: updateSpec
			}, (error, result) => {
				if (error) {
					response.sendStatus(500)
					return console.error(error)
				}

				if (!result) {
					response.status(404).send(`User with ID ${request.params.id} not found!`)
					return
				}
			})
		})
	})

	server.get('/articles', (request, response) => {
		const query = filtersToDBQuery(request.query)

		DB.collection('articles').find(query, { projection: { _id: true }}).toArray((error, articlesIDs) => {
			if (error) {
				response.sendStatus(500)
				return console.error(error)
			}

			response.send(articlesIDs)
		})
	})

	server.post('/articles/add-article', authz, (request, response) => {
		const today = new Date()

		/**
		 * @todo Author.
		 * @todo Rating.
		 */

		DB.collection('articles').insertOne({
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
			if (error) {
				response.sendStatus(500)
				return console.error(error)
			}

			if (!result) {
				response.status(500).send(`Article with ID ${request.params.id} not found!`)
				return
			}

			response.send({_id: result.insertedId})
		})
	})

	server.get('/articles/article-:id', (request, response) => {
		DB.collection('articles').findOne({_id: new ObjectID(request.params.id)}, (error, article) => {
			if (error) {
				response.sendStatus(500)
				return console.error(error)
			}

			if (!article) {
				response.status(404).send(`Article with ID ${request.params.id} not found!`)
				return
			}

			response.send(article)
		})
	})

	server.post('/articles/article-:id/add-review', authz, (request, response) => {
		const today = new Date()

		/**
		 * @todo Get author from token.
		 * @todo Validate data.
		 */

		DB.collection('articles').updateOne({
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
			if (error) {
				response.sendStatus(500)
				return console.error(error)
			}

			if (!result) {
				response.status(404).send(`Article with ID ${request.params.id} not found!`)
				return
			}

			response.sendStatus(200)
		})
	})

	server.listen(3003, () => {
		console.log("HTTP server listening on http://localhost:3003.")
	})
})
