import User from "../../../domain/User";
import {IAuthenticationResponse} from "../../../contracts/authentication/IAuthenticationResponse";
import {IAuthRepository} from "../interfaces/IAuthRepository";
import {IPresenter} from "../interfaces/IPresenter";
import {IRegisterRequest} from "../../../contracts/authentication/IRegisterRequest";
import {IJwtTokenGenerator} from "../interfaces/IJwtTokenGenerator";
import {ILoginRequest} from "../../../contracts/authentication/ILoginRequest";

export default class RegisterCommand {

    private _authRepository: IAuthRepository;
    private _loginPresenter: IPresenter;
    private _jwtTokenGenerator: IJwtTokenGenerator
    public constructor(
        authRepository: IAuthRepository,
        loginPresenter: IPresenter,
        jwtTokenGenerator: IJwtTokenGenerator
    ) {
        this._authRepository = authRepository
        this._loginPresenter = loginPresenter
        this._jwtTokenGenerator = jwtTokenGenerator
    }

    public async execute(request: ILoginRequest): Promise<void> {

        try {
            const user = await this._authRepository.getUser(
                request.email,
                request.password
            )

            const token = this._jwtTokenGenerator.generateToken(user.id, user.getEmail)

            const authenticationResponse: IAuthenticationResponse = {
                id: user.id,
                name: user.getName,
                email: user.getEmail,
                token: token
            }

            this._loginPresenter.present(authenticationResponse)

        } catch (error) {
            throw error
        }
    }
}