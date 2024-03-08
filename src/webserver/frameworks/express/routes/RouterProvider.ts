import {Request, Response, NextFunction, Router} from 'express'
import {IHTTPRequest} from "../../../../interfaces/IHTTPRequest";

export abstract class RouterProvider {

    protected _router: Router;
    protected constructor() {
        this._router = Router();
    }

    public getRouter(): Router {
        return this._router;
    }

    protected handleHTTPRequest(Controller: any, Response: any) {
        return async (req: Request, res: Response, next:NextFunction) => {

            const mappedRequest: IHTTPRequest = {
                query: req.query,
                params: req.params,
                body: req.body,
                headers: req.headers
            }

            try {
                const response = new Response(res)

                const result = await Controller.execute(mappedRequest)

                response.respond(result)

            } catch (error) {
                next(error)
            }
        }
    }
}