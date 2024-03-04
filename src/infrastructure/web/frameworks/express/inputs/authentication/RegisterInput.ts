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
import {
    RegisterCommandValidator
} from "../../../../../../application/authentication/commands/register/RegisterCommandValidator";

export default class RegisterInput extends Input {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {
        const authRepository = container.resolve('authRepository')
        const tokenService = container.resolve('tokenService')
        const cryptoService = container.resolve('cryptoService')
        const idGenerator = container.resolve('idGenerator')

        const response = new CreatedOutput(this.res)
        const registerPresenter = new Presenter(response)
        const registerValidator = new RegisterCommandValidator()

        const registerCommandService: IRegisterCommandHandler = new RegisterCommandHandler(
            authRepository,
            registerPresenter,
            tokenService,
            cryptoService,
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