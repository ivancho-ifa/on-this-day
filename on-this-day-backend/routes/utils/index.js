function filtersToDBQuery(filters) {
	let query = {}

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

function handleDBError(error, response) {
	return response.status(500).send(`DB error occured!`) && console.error(error)
}

function respondAndLogError(response, responseMessage, responseStatus, logMessage) {
	if (!logMessage) logMessage = responseMessage
	if (responseStatus) response.status(responseStatus)

	response.send(responseMessage)
	console.error(logMessage)
}

function handleArticleNotFound(request, response) {
	respondAndLogError(response.status(404), `Article with ID ${request.params.id} not found!`)
}


module.exports = {
	filtersToDBQuery,
	handleArticleNotFound,
	handleDBError,
	respondAndLogError
}
