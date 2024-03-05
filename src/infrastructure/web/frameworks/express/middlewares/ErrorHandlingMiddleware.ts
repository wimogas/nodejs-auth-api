import {Response, Request, NextFunction} from "express";
class ErrorHandlingMiddleware {
     public handleError(error: any, req: Request, res: Response, next: NextFunction) {

        return res.setHeader('content-type', 'application/problem+json')
            .status(500)
            .json({
                error
            }
        )
    }
}

export default new ErrorHandlingMiddleware();

