import {Request, Response, NextFunction} from "express";
import {NoContentOutput} from "../../outputs/NoContentOutput";
import AuthenticationController from "../../../../../authentication/api/AuthenticationController";
import Input from "../Input";
import {IHTTPRequest} from "../../../../../authentication/application/common/interfaces/IHTTPRequest";
import {
    ValidateCreateUserCommandBehavior
} from "../../../../../authentication/application/common/behaviors/ValidateCreateUserCommandBehavior";
import {
    ValidateDeleteUserCommandBehavior
} from "../../../../../authentication/application/common/behaviors/ValidateDeleteUserCommandBehavior";

export default class DeleteUserInput extends Input {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {

        const deleteUserOutput = new NoContentOutput(this.res)

        const request: IHTTPRequest = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const validateDeleteUserCommandBehavior = new ValidateDeleteUserCommandBehavior()

        try {
            await validateDeleteUserCommandBehavior.execute(request)

            deleteUserOutput.respond()

        } catch (error) {
            this.respondWithError(error)
        }
    }
}