const jwt = require('jsonwebtoken')


const secret = 'SUPERSECRET'


const authz = function (request, response, next) {
	const token = request.headers['x-access-token'] || request.cookies.token

	if (!token) {
		response.status(401).send('Unauthorized: No token provided')
	} else {
		jwt.verify(token, secret, function (error, decodedJWT) {
			if (error) {
				response.status(401).send('Unauthorized: Invalid token')
			} else {
				const authnData = {
					userID: decodedJWT.userID
				}
				request.authnData = authnData

				next()
			}
		})
	}
}
module.exports = authz
