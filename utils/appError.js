export default class ApiError extends Error {
    constructor(message, statusCode, data){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);

    }

}
