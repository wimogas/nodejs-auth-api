import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import {OkOutput} from "../../outputs/OkOutput";
import Presenter from "../../../../../../api/Presenter";
import LoginQueryHandler from "../../../../../../application/authentication/queries/login/LoginQueryHandler";
import ILoginQueryService
    from "../../../../../../application/authentication/queries/login/interface/ILoginQueryService";
import LoginController from "../../../../../../api/authentication/LoginController";

import container from '../../../../di/index'

export default class LoginInput extends IInput {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {

        const response = new OkOutput(this.res)
        const loginPresenter = new Presenter(response)

        const authRepository = container.resolve('authRepository')
        const tokenGenerator = container.resolve('tokenGenerator')
        const crypto = container.resolve('crypto')
        const loginValidator = container.resolve('loginValidator')

        const loginQueryService: ILoginQueryService = new LoginQueryHandler(
            authRepository,
            loginPresenter,
            tokenGenerator,
            crypto,
        )

        const request: IHTTPRequest = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const authController = new LoginController(
            loginValidator,
            loginQueryService
        )

        try {
            await authController.Login(request)
        } catch (error) {
            this.respondWithError(error)
        }
    }
}