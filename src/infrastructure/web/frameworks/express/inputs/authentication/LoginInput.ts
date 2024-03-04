import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import {AuthRepository} from "../../../../../database/mongodb/authentication/AuthRepository";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import {OkOutput} from "../../outputs/OkOutput";
import Presenter from "../../../../../../api/Presenter";
import {ITokenService} from "../../../../../../application/common/interfaces/authentication/ITokenService";
import {JwtTokenService} from "../../../../../security/JwtTokenService";
import {ICryptoService} from "../../../../../../application/common/interfaces/authentication/ICryptoService";
import {BcryptCryptoService} from "../../../../../security/BcryptCryptoService";
import {IIdGeneratorService} from "../../../../../../application/common/interfaces/persistance/IIdGeneratorService";
import {MongoDbIdGeneratorService} from "../../../../../services/MongoDbIdGeneratorService";
import {LoginQueryValidator} from "../../../../../../application/authentication/queries/login/LoginQueryValidator";
import LoginQueryService from "../../../../../../application/authentication/queries/login/LoginQueryService";
import ILoginQueryService
    from "../../../../../../application/authentication/queries/login/interface/ILoginQueryService";
import LoginController from "../../../../../../api/authentication/LoginController";

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
        const validator = new LoginQueryValidator()
        const response = new OkOutput(this.res)
        const loginPresenter = new Presenter(response)
        const tokenGenerator: ITokenService = new JwtTokenService()
        const crypto: ICryptoService = new BcryptCryptoService()
        const idGenerator: IIdGeneratorService = new MongoDbIdGeneratorService()

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