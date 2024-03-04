import {IAuthenticationResponse} from "../../../contracts/authentication/IAuthenticationResponse";
import {IAuthRepository} from "../../common/interfaces/persistance/IAuthRepository";
import {IPresenter} from "../../common/interfaces/IPresenter";
import {ITokenService} from "../../common/interfaces/authentication/ITokenService";
import {ILoginRequest} from "../../../contracts/authentication/ILoginRequest";
import {ICryptoService} from "../../common/interfaces/authentication/ICryptoService";
import User from "../../../domain/entities/User";
import {AuthErrors} from "../../../domain/errors/AuthErrors";
import IAuthenticationQueryService from "./interface/IAuthenticationQueryService";

export default class AuthenticationQueryService implements IAuthenticationQueryService{

    private _authRepository: IAuthRepository;
    private _presenter: IPresenter;
    private _tokenGenerator: ITokenService
    private _crypto: ICryptoService;

    public constructor(
        authRepository: IAuthRepository,
        presenter: IPresenter,
        tokenGenerator: ITokenService,
        crypto: ICryptoService
    ) {
        this._authRepository = authRepository
        this._presenter = presenter
        this._tokenGenerator = tokenGenerator
        this._crypto = crypto
    }

    public async getLoginTokenQuery(request: ILoginRequest): Promise<void> {

        const foundUser = await this._authRepository.getUserByEmail(request.email)

        let isCorrectPassword = false;

        if (foundUser) {
            isCorrectPassword = await this._crypto.handleCompare(request.password, foundUser.password)
        }

        if (!foundUser || !isCorrectPassword) {
            throw AuthErrors.InvalidCredentials()
        }

        const user = User.create({
            name: foundUser.name,
            email: foundUser.email,
            password: request.password
        }, foundUser._id.toString())

        try {
            const token = this._tokenGenerator.generateToken(user.id, user)

            const authenticationResponse: IAuthenticationResponse = {
                id: user.id,
                name: user.getName,
                email: user.getEmail,
                token: token
            }

            this._presenter.present(authenticationResponse)

        } catch (error) {
            throw error
        }
    }
}