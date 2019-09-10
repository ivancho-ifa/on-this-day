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

function handleRequestError() {

}


module.exports = {
	filtersToDBQuery,
	handleDBError,
	handleRequestError
}
