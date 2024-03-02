class ErrorHandlingMiddleware {
     public handleError(error, req, res, next) {
        error.statusCode = error.statusCode || 404;
        return res.status(error.statusCode).json(
            {
                message: error.message ? error.message : "Unknown Error"
            }
        )
    }
}

export default new ErrorHandlingMiddleware();

