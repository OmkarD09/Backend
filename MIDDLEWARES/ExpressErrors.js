class ExpressErrors extends Error {
    constructor(message, statusCode) {
        super();
        this.statusCode = statusCode || 500;
        this.message = message || 'Internal Server Error';
    }
}

module.exports = ExpressErrors;
