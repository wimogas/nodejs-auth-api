import User from "../../../domain/User";
import {IAuthenticationResponse} from "../../../contracts/authentication/IAuthenticationResponse";
import {IAuthRepository} from "../interfaces/IAuthRepository";
import {IPresenter} from "../interfaces/IPresenter";
import {IRegisterRequest} from "../../../contracts/authentication/IRegisterRequest";
import {IJwtTokenGenerator} from "../interfaces/IJwtTokenGenerator";

export default class RegisterCommand {

    private _authRepository: IAuthRepository;
    private _registerPresenter: IPresenter;
    private _jwtTokenGenerator: IJwtTokenGenerator
    public constructor(
        authRepository: IAuthRepository,
        authPresenter: IPresenter,
        jwtTokenGenerator: IJwtTokenGenerator
    ) {
        this._authRepository = authRepository
        this._registerPresenter = authPresenter
        this._jwtTokenGenerator = jwtTokenGenerator
    }

    public async execute(request: IRegisterRequest): Promise<void> {

        const newUser = User.create({
            name: request.name,
            email: request.email,
            password: request.password
        })

        try {
            const user = await this._authRepository.addUser(newUser)

            const token = this._jwtTokenGenerator.generateToken(user.id, user.getEmail)

            const authenticationResponse: IAuthenticationResponse = {
                id: user.id,
                name: user.getName,
                email: user.getEmail,
                token: token
            }

            this._registerPresenter.present(authenticationResponse)

        } catch (error) {
            throw error
        }
    }
}