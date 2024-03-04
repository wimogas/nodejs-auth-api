import {Response, Request, NextFunction} from "express";
class ErrorHandlingMiddleware {
     public handleError(error: any, req: Request, res: Response, next: NextFunction) {
        error.statusCode = error.statusCode || 404;
         error.message = error.message || "Unknown Error";
        return res.status(error.statusCode).json({
                message: error.message
            }
        )
    }
}

export default new ErrorHandlingMiddleware();

