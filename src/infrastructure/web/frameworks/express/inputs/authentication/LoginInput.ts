import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import {AuthRepository} from "../../../../../database/mongodb/authentication/AuthRepository";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import {OkOutput} from "../../outputs/OkOutput";
import {LoginValidator} from "../../../../../../application/authentication/validators/LoginValidator";
import {CryptoService} from "../../../../../security/CryptoService";
import AuthenticationController from "../../../../../../api/authentication/AuthenticationController";

export default class LoginInput extends IInput {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {

        const crypto = new CryptoService()
        const authRepository = new AuthRepository(crypto)
        const validator = new LoginValidator()

        const response = new OkOutput(this.res)

        const request: IHTTPRequest = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const authController = new AuthenticationController(
            authRepository,
            response,
            validator
        )

        try {
            await authController.Login(request)
        } catch (error) {
            this.respondWithError(error)
        }
    }

}