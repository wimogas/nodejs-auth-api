import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import {AuthRepository} from "../../../../../database/mongodb/authentication/AuthRepository";
import {CreatedOutput} from "../../outputs/CreatedOutput";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import RegisterController from "../../../../../../api/authentication/RegisterController";
import {LoginQueryValidator} from "../../../../../../application/authentication/queries/login/LoginQueryValidator";
import Presenter from "../../../../../../api/Presenter";
import {ITokenService} from "../../../../../../application/common/interfaces/authentication/ITokenService";
import {JwtTokenService} from "../../../../../security/JwtTokenService";
import {ICryptoService} from "../../../../../../application/common/interfaces/authentication/ICryptoService";
import {BcryptCryptoService} from "../../../../../security/BcryptCryptoService";
import {IIdGeneratorService} from "../../../../../../application/common/interfaces/persistance/IIdGeneratorService";
import {MongoDbIdGeneratorService} from "../../../../../services/MongoDbIdGeneratorService";
import RegisterCommandService
    from "../../../../../../application/authentication/commands/register/RegisterCommandService";
import IRegisterCommandService
    from "../../../../../../application/authentication/commands/register/interface/IRegisterCommandService";

export default class RegisterInput extends IInput {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {

        const authRepository = new AuthRepository()
        const validator = new LoginQueryValidator()
        const response = new CreatedOutput(this.res)
        const registerPresenter = new Presenter(response)
        const tokenGenerator: ITokenService = new JwtTokenService()
        const crypto: ICryptoService = new BcryptCryptoService()
        const idGenerator: IIdGeneratorService = new MongoDbIdGeneratorService()

        const registerCommandService: IRegisterCommandService = new RegisterCommandService(
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
            validator,
            registerCommandService
        )

        try {
            await authController.Register(request)
        } catch (error) {
            this.respondWithError(error)
        }
    }

}