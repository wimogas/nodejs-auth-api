import {Request, Response, NextFunction, Router} from 'express'
import {IVerifiedRequest} from "../interfaces/IVerifiedRequest";
import {IInput} from "../inputs/interfaces/IInput";
import {IVerifiedInput} from "../inputs/interfaces/IVerifiedInput";

export abstract class RouterProvider {

    protected _router: Router;
    protected constructor() {
        this._router = Router();
    }

    public getRouter(): Router {
        return this._router;
    }

    protected handleHTTPRequest(Input: IInput) {
        return async (req: Request, res: Response, next:NextFunction) => {
            const input = new Input(req, res, next)
            await input.execute()
        }
    }

    protected handleVerifiedHTTPRequest(Input: IVerifiedInput) {
        return async (req: IVerifiedRequest, res: Response, next:NextFunction) => {
            const input = new Input(req, res, next)
            await input.execute()
        }
    }
}