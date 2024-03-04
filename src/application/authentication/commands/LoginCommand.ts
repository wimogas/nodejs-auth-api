import {IAuthenticationResponse} from "../../../contracts/authentication/IAuthenticationResponse";
import {IAuthRepository} from "../../common/interfaces/persistance/IAuthRepository";
import {IPresenter} from "../../common/interfaces/IPresenter";
import {ITokenService} from "../../common/interfaces/authentication/ITokenService";
import {ILoginRequest} from "../../../contracts/authentication/ILoginRequest";

export default class RegisterCommand {

    private _authRepository: IAuthRepository;
    private _presenter: IPresenter;
    private _jwtTokenGenerator: ITokenService
    public constructor(
        authRepository: IAuthRepository,
        presenter: IPresenter,
        jwtTokenGenerator: ITokenService
    ) {
        this._authRepository = authRepository
        this._presenter = presenter
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

            this._presenter.present(authenticationResponse)

        } catch (error) {
            throw error
        }
    }
}