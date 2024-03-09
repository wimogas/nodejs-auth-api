import {Request, Response, NextFunction, Router} from 'express'
import {IHTTPRequest, IController} from "../../../../interfaces";
import {ICustomRequest} from "../interfaces";

export abstract class RouterBuilder {

    protected _router: Router;
    protected constructor() {
        this._router = Router();
    }

    public getRouter(): Router {
        return this._router;
    }

    protected handleHTTPRequest(Controller: IController, Response: any) {
        return async (req: ICustomRequest, res: Response, next:NextFunction) => {

            const mappedRequest: IHTTPRequest = {
                user: req.user,
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