import {Request, Response, NextFunction} from 'express'
import Input from "../Input";
import {CreatedOutput} from "../../outputs/CreatedOutput";
import {IHTTPRequest} from "../../../../../authentication/application/common/interfaces/IHTTPRequest";
import AuthenticationController from "../../../../../authentication/api/AuthenticationController";

export default class RegisterInput extends Input {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {

        const registerOutput = new CreatedOutput(this.res)

        const request: IHTTPRequest = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const authController = new AuthenticationController()

        try {
            const response = await authController.createUser(request)

            registerOutput.respond(response)

        } catch (error) {
            this.respondWithError(error)
        }
    }

}