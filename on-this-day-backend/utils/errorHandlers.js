function log (error, request, response, next) {
	console.error(error)

	next(error)
}

function respond(error, request, response, next) {
	response.status(error.status || 500)

	if (!error.message) return response.end()

	response.send({
		message: error.message
	})
}


module.exports = {
	log,
	respond
}
