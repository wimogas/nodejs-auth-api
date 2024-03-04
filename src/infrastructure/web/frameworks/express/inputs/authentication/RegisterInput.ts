import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import {AuthRepository} from "../../../../../database/mongodb/authentication/AuthRepository";
import {CreatedOutput} from "../../outputs/CreatedOutput";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import {RegisterValidator} from "../../../../../../application/authentication/validators/RegisterValidator";
import AuthenticationController from "../../../../../../api/authentication/AuthenticationController";
import {LoginValidator} from "../../../../../../application/authentication/validators/LoginValidator";
import {OkOutput} from "../../outputs/OkOutput";
import Presenter from "../../../../../../api/Presenter";
import {ITokenService} from "../../../../../../application/common/interfaces/authentication/ITokenService";
import {JwtTokenService} from "../../../../../security/JwtTokenService";
import {ICryptoService} from "../../../../../../application/common/interfaces/authentication/ICryptoService";
import {BcryptCryptoService} from "../../../../../security/BcryptCryptoService";
import {IIdGeneratorService} from "../../../../../../application/common/interfaces/persistance/IIdGeneratorService";
import {MongoDbIdGeneratorService} from "../../../../../services/MongoDbIdGeneratorService";
import AuthenticationCommandService
    from "../../../../../../application/authentication/commands/AuthenticationCommandService";
import AuthenticationQueryService
    from "../../../../../../application/authentication/queries/AuthenticationQueryService";

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
        const validator = new LoginValidator()
        const response = new CreatedOutput(this.res)
        const registerPresenter = new Presenter(response)
        const tokenGenerator: ITokenService = new JwtTokenService()
        const crypto: ICryptoService = new BcryptCryptoService()
        const idGenerator: IIdGeneratorService = new MongoDbIdGeneratorService()

        const authenticationCommandService: AuthenticationCommandService = new AuthenticationCommandService(
            authRepository,
            registerPresenter,
            tokenGenerator,
            crypto,
            idGenerator
        )

        const authenticationQueryService: AuthenticationQueryService = new AuthenticationQueryService(
            authRepository,
            registerPresenter,
            tokenGenerator,
            crypto,
        )
        const request: IHTTPRequest = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const authController: AuthenticationController = new AuthenticationController(
            validator,
            authenticationQueryService,
            authenticationCommandService
        )

        try {
            await authController.Register(request)
        } catch (error) {
            this.respondWithError(error)
        }
    }

}