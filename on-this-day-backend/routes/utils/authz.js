/**
 * @todo Document.
 */

const jwt = require('jsonwebtoken')

const config = require('../../config')
const errors = require('../../utils/errors')


/**
 * @todo Rename to something more appropriately.
 */

const authz = function (request, response, next) {
	const token = request.cookies.token

	if (!token) return next(new errors.RequestHandlingError(401, 'No JWT provided!'))

	jwt.verify(token, config.JWTSecret, function (error, decodedJWT) {
		if (error) {
			if (error.name === 'TokenExpiredError')
				/**
				 * @todo Handle expired tokens with Passport.js'
				 * <a href="http://www.passportjs.org/packages/passport-local/">local strategy</a>
				 */
				return response.clearCookie('token', { httpOnly: true }).status(200).send('JWT has expired!')
			else
				return next(new errors.RequestHandlingError(401, 'Invalid JWT!'))
		}

		const authnData = { userID: decodedJWT.userID }
		request.authnData = authnData

		return next()
	})
}


module.exports = authz
