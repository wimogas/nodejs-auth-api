import {Response, Request, NextFunction} from "express";
class ErrorHandlingMiddleware {
    public handleError(error: any, req: Request, res: Response, next: NextFunction) {
        error.status = error.status || 404;
        error.title = error.title || error;

        return res.setHeader('content-type', 'application/problem+json')
            .status(error.status)
            .json({...error})
    }
}

export default new ErrorHandlingMiddleware();