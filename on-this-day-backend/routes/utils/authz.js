const jwt = require('jsonwebtoken')


const secret = 'SUPERSECRET'


const authz = function (request, response, next) {
	const token = request.cookies.token

	if (!token) {
		response.status(401).send('Unauthorized: No token provided')
	} else {
		jwt.verify(token, secret, function (error, decodedJWT) {
			if (!error) {
				const authnData = {
					userID: decodedJWT.userID
				}
				request.authnData = authnData

				next()
			} else if (error.name === 'TokenExpiredError') {
				response.clearCookie('token', { httpOnly: true }).status(200).send('JWT has expired!')
			} else {
				response.status(401).send('Unauthorized: Invalid token')
			}
		})
	}
}


module.exports = authz
