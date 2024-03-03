import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import RegisterController from "../../../../../../api/authentication/controllers/RegisterController";
import {AuthRepository} from "../../../../../database/mongodb/authentication/AuthRepository";
import {CreatedOutput} from "../../outputs/CreatedOutput";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import {RegisterValidator} from "../../../../../../application/authentication/validators/RegisterValidator";
import {OkOutput} from "../../outputs/OkOutput";
import {LoginValidator} from "../../../../../../application/authentication/validators/LoginValidator";
import LoginController from "../../../../../../api/authentication/controllers/LoginController";

export default class LoginInput extends IInput {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {
        const authRepository = new AuthRepository()
        const validator = new LoginValidator()

        const response = new OkOutput(this.res)

        const request: IHTTPRequest = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const loginController = new LoginController(
            authRepository,
            response,
            validator
        )

        try {
            await loginController.execute(request)
        } catch (error) {
            this.respondWithError(error)
        }
    }

}