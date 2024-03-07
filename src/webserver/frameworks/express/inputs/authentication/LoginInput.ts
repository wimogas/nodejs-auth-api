import {Request, Response, NextFunction} from 'express'
import Input from "../Input";
import {OkOutput} from "../../outputs/OkOutput";
import {IHTTPRequest} from "../../../../../authentication/application/common/interfaces/IHTTPRequest";
import AuthenticationController from "../../../../../authentication/api/AuthenticationController";
import {
    ValidateGetLoginTokenQueryBehavior
} from "../../../../../authentication/application/common/behaviors/ValidateGetLoginTokenQueryBehavior";

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

        const validateGetLoginTokenQueryBehavior = new ValidateGetLoginTokenQueryBehavior()

        try {
            const response = await validateGetLoginTokenQueryBehavior.execute(request)

            loginOutput.respond(response)

        } catch (error) {
            this.respondWithError(error)
        }
    }
}