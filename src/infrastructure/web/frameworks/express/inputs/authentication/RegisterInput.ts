import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import RegisterController from "../../../../../../api/authentication/controllers/RegisterController";
import {AuthRepository} from "../../../../../database/mongodb/authentication/AuthRepository";
import {CreatedOutput} from "../../outputs/CreatedOutput";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import {RegisterValidator} from "../../../../../../application/authentication/validators/RegisterValidator";
import {CryptoService} from "../../../../../security/CryptoService";

export default class RegisterInput extends IInput {

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
        const validator = new RegisterValidator()

        const response = new CreatedOutput(this.res)

        const request: IHTTPRequest = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const registerController: RegisterController = new RegisterController(
            authRepository,
            response,
            validator
        )

        try {
            await registerController.execute(request)
        } catch (error) {
            this.respondWithError(error)
        }
    }

}