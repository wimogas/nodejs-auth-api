import VerifiedInput from "../VerifiedInput";
import {Response, NextFunction} from "express";
import {IVerifiedRequest} from "../../interfaces/IVerifiedRequest";
import {IHTTPVerifiedRequest} from "../../../../../authentication/application/common/interfaces/IHTTPVerifiedRequest";
import {NoContentOutput} from "../../outputs/NoContentOutput";
import AuthenticationController from "../../../../../authentication/api/AuthenticationController";

export default class DeleteUserInput extends VerifiedInput {

    public constructor(
        req: IVerifiedRequest,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {

        const deleteUserOutput = new NoContentOutput(this.res)

        const request: IHTTPVerifiedRequest = {
            user: this.req.user,
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const authController = new AuthenticationController()

        try {

            await authController.deleteUser(request)

            deleteUserOutput.respond()

        } catch (error) {
            this.respondWithError(error)
        }
    }
}