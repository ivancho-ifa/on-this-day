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


module.exports = {
	isEmptyObject,
	filtersToDBQuery
}
