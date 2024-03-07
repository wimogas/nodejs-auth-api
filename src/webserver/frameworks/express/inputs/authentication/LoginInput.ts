import {Request, Response, NextFunction} from 'express'
import Input from "../Input";
import {OkOutput} from "../../outputs/OkOutput";
import {IHTTPRequest} from "../../../../../authentication/application/common/interfaces/IHTTPRequest";
import AuthenticationController from "../../../../../authentication/api/AuthenticationController";

export default class LoginInput extends Input {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {
        const loginOutput = new OkOutput(this.res)

        const request: IHTTPRequest = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const authController = new AuthenticationController()

        try {
            const response = await authController.getLoginToken(request)

            loginOutput.respond(response)

        } catch (error) {
            this.respondWithError(error)
        }
    }
}