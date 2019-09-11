class RequestHandlingError extends Error {
	constructor(status, ...params) {
		super(...params)

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, RequestHandlingError)
		}

		this.name = 'RequestHandlingError'
		this.status = status
	}
}

class ArticleNotFound extends RequestHandlingError {
	constructor(id, ...params) {
		super(404, `Article with ID ${id} not found!`, ...params)

		this.name = 'ArticleNotFound'
	}
}


module.exports = {
	ArticleNotFound,
	RequestHandlingError
}
