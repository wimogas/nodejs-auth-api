import {Request, Response, NextFunction, Router} from 'express'
import {IHTTPRequest} from "../../../../authentication/application/common/interfaces/IHTTPRequest";

export abstract class RouterProvider {

    protected _router: Router;
    protected constructor() {
        this._router = Router();
    }

    public getRouter(): Router {
        return this._router;
    }

    protected handleHTTPRequest(Validator: any, Output: any) {
        return async (req: Request, res: Response, next:NextFunction) => {

            const mappedRequest: IHTTPRequest = {
                query: req.query,
                params: req.params,
                body: req.body,
                headers: req.headers
            }

            try {
                const output = new Output(res)
                const validator = new Validator()

                const result = await validator.execute(mappedRequest)

                output.respond(result)
            } catch (error) {
                next(error)
            }
        }
    }
}