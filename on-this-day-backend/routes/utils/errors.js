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


module.exports = {
	RequestHandlingError
}
