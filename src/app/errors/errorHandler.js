module.exports = {
	NotFoundError: class NotFoundError extends Error {
		constructor(message) {
			super(message);
			this.name = 'NotFoundError';
			this.status = "404";
		}
	},
	NoData: class NoData extends Error {
		constructor(message) {
			super();
			this.name = 'NoData';
			this.status = 200;
			this.messageObject = message;
		}
	},
	BadRequestError: class BadRequestError extends Error {
		constructor(message) {
			super(message);
			this.name = 'BadRequestError';
			this.status = 400;
		}
	},
	ValidationError: class ValidationError extends Error {
		constructor(message) {
			super();
			this.name = 'ValidationError';
			this.status = 422;
			this.messageObject = message;
		}
	},
	UnauthorizedError: class UnauthorizedError extends Error {
		constructor(message) {
			super();
			this.name = 'UnauthorizedError';
			this.status = 401;
			this.messageObject = message;
		}
	}
}
