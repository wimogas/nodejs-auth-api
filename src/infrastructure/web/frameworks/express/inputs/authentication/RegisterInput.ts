import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import {CreatedOutput} from "../../outputs/CreatedOutput";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import RegisterController from "../../../../../../api/authentication/RegisterController";
import {LoginQueryValidator} from "../../../../../../application/authentication/queries/login/LoginQueryValidator";
import Presenter from "../../../../../../api/Presenter";
import {ITokenService} from "../../../../../../application/common/interfaces/security/ITokenService";
import {ICryptoService} from "../../../../../../application/common/interfaces/security/ICryptoService";
import {IIdGeneratorService} from "../../../../../../application/common/interfaces/services/IIdGeneratorService";
import RegisterCommandHandler
    from "../../../../../../application/authentication/commands/register/RegisterCommandHandler";
import IRegisterCommandService
    from "../../../../../../application/authentication/commands/register/interface/IRegisterCommandService";
import {TokenServiceFactory} from "../../../../../security/token/TokenServiceFactory";
import {CryptoServiceFactory} from "../../../../../security/crypto/CryptoServiceFactory";
import {IdGeneratorServiceFactory} from "../../../../../services/id/IdGeneratorServiceFactory";
import {AuthRepositoryFactory} from "../../../../../database/AuthRepositoryFactory";
import container from "../../../../di";

export default class RegisterInput extends IInput {

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
        const tokenGenerator = container.resolve('tokenGenerator')
        const crypto = container.resolve('crypto')
        const idGenerator = container.resolve('idGenerator')
        const registerValidator = container.resolve('registerValidator')

        const registerCommandService: IRegisterCommandService = new RegisterCommandHandler(
            authRepository,
            registerPresenter,
            tokenGenerator,
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