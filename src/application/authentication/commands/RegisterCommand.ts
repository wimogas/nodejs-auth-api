import User from "../../../domain/User";
import {IAuthenticationResponse} from "../../../contracts/authentication/IAuthenticationResponse";
import {IAuthRepository} from "../../common/interfaces/persistance/IAuthRepository";
import {IPresenter} from "../../common/interfaces/IPresenter";
import {IRegisterRequest} from "../../../contracts/authentication/IRegisterRequest";
import {ITokenService} from "../../common/interfaces/authentication/ITokenService";

export default class RegisterCommand {

    private _authRepository: IAuthRepository;
    private _presenter: IPresenter;
    private _tokenGenerator: ITokenService
    public constructor(
        authRepository: IAuthRepository,
        presenter: IPresenter,
        tokenGenerator: ITokenService
    ) {
        this._authRepository = authRepository
        this._presenter = presenter
        this._tokenGenerator = tokenGenerator
    }

    public async execute(request: IRegisterRequest): Promise<void> {

        const newUser = User.create({
            name: request.name,
            email: request.email,
            password: request.password
        })

        try {
            const user = await this._authRepository.addUser(newUser)

            const token = this._tokenGenerator.generateToken(user.id, user.getEmail)

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