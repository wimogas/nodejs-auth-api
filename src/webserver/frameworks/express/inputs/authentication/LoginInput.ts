import {Request, Response, NextFunction} from 'express'
import Input from "../Input";
import {OkOutput} from "../../outputs/OkOutput";
import LoginController from "../../../../../authentication/api/authentication/LoginController";
import {IHTTPRequest} from "../../../../../common/http/interfaces/IHTTPRequest";

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

        const authController = new LoginController()

        try {
            const response = await authController.Login(request)

            loginOutput.respond(response)

        } catch (error) {
            this.respondWithError(error)
        }
    }
}