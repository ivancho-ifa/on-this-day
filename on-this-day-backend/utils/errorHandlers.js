function log (error, request, response, next) {
	console.error(error)

	next(error)
}

function respond(error, request, response, next) {
	const status = error.status || 500

	response.status(status).send({
		message: error.message
	})
}


module.exports = {
	log,
	respond
}
