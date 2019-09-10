const jwt = require('jsonwebtoken')

const config = require('../../config')
const errors = require('../utils/errors')


const authz = function (request, response, next) {
	const token = request.cookies.token

	if (!token) return next(new errors.RequestHandlingError(401, 'No JWT provided!'))

	jwt.verify(token, config.JWTSecret, function (error, decodedJWT) {
		if (error) {
			if (error.name === 'TokenExpiredError')
				return response.clearCookie('token', { httpOnly: true }).status(200).send('JWT has expired!')
			else
				return next(new errors.RequestHandlingError(401, 'Invalid JWT!'))
		}

		const authnData = { userID: decodedJWT.userID }
		request.authnData = authnData

		next()
	})
}


module.exports = authz
