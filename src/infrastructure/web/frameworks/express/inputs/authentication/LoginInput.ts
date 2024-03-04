import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import {MongoDbAuthRepository} from "../../../../../database/mongodb/authentication/MongoDbAuthRepository";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import {OkOutput} from "../../outputs/OkOutput";
import Presenter from "../../../../../../api/Presenter";
import {ITokenService} from "../../../../../../application/common/interfaces/authentication/ITokenService";
import {JwtTokenService} from "../../../../../security/token/JwtTokenService";
import {ICryptoService} from "../../../../../../application/common/interfaces/authentication/ICryptoService";
import {BcryptCryptoService} from "../../../../../security/crypto/BcryptCryptoService";
import {LoginQueryValidator} from "../../../../../../application/authentication/queries/login/LoginQueryValidator";
import LoginQueryService from "../../../../../../application/authentication/queries/login/LoginQueryService";
import ILoginQueryService
    from "../../../../../../application/authentication/queries/login/interface/ILoginQueryService";
import LoginController from "../../../../../../api/authentication/LoginController";
import {TokenServiceFactory} from "../../../../../security/token/TokenServiceFactory";
import {CryptoServiceFactory} from "../../../../../security/crypto/CryptoServiceFactory";
import {AuthRepositoryFactory} from "../../../../../database/AuthRepositoryFactory";

export default class LoginInput extends IInput {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {

        const authRepository = AuthRepositoryFactory.createAuthRepository(process.env.DB)
        const validator = new LoginQueryValidator()
        const response = new OkOutput(this.res)
        const loginPresenter = new Presenter(response)
        const tokenGenerator: ITokenService = TokenServiceFactory.createTokenService(process.env.TOKEN_PROVIDER)
        const crypto: ICryptoService = CryptoServiceFactory.createCryptoService(process.env.CRYPTO)

        const loginQueryService: ILoginQueryService = new LoginQueryService(
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
            validator,
            loginQueryService
        )

        try {
            await authController.Login(request)
        } catch (error) {
            this.respondWithError(error)
        }
    }
}