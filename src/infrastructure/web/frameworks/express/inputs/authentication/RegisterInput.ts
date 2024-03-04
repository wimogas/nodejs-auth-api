import {Request, Response, NextFunction} from 'express'
import Input from "../Input";
import {CreatedOutput} from "../../outputs/CreatedOutput";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import RegisterController from "../../../../../../api/authentication/RegisterController";
import Presenter from "../../../../../../api/Presenter";
import RegisterCommandHandler
    from "../../../../../../application/authentication/commands/register/RegisterCommandHandler";
import IRegisterCommandHandler
    from "../../../../../../application/authentication/commands/register/interface/IRegisterCommandHandler";
import container from "../../../../di";

export default class RegisterInput extends Input {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {

        const response = new CreatedOutput(this.res)
        const registerPresenter = new Presenter(response)

        const authRepository = container.resolve('authRepository')
        const tokenService = container.resolve('tokenService')
        const crypto = container.resolve('crypto')
        const idGenerator = container.resolve('idGenerator')
        const registerValidator = container.resolve('registerValidator')

        const registerCommandService: IRegisterCommandHandler = new RegisterCommandHandler(
            authRepository,
            registerPresenter,
            tokenService,
            crypto,
            idGenerator
        )

        const request: IHTTPRequest = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const authController: RegisterController = new RegisterController(
            registerValidator,
            registerCommandService
        )

        try {
            await authController.Register(request)
        } catch (error) {
            this.respondWithError(error)
        }
    }

}