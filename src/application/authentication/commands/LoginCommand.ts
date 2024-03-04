import {IAuthenticationResponse} from "../../../contracts/authentication/IAuthenticationResponse";
import {IAuthRepository} from "../../common/interfaces/persistance/IAuthRepository";
import {IPresenter} from "../../common/interfaces/IPresenter";
import {ITokenService} from "../../common/interfaces/authentication/ITokenService";
import {ILoginRequest} from "../../../contracts/authentication/ILoginRequest";
import {ICryptoService} from "../../common/interfaces/authentication/ICryptoService";
import User from "../../../domain/entities/User";

export default class RegisterCommand {

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

    public async execute(request: ILoginRequest): Promise<void> {

        const foundUser = await this._authRepository.getUserByEmail(request.email)

        if (!foundUser) {
            throw {
                statusCode: 400,
                message: "Invalid credentials"
            }
        }

        const isCorrectPassword = await this._crypto.handleCompare(request.password, foundUser.password)

        if (!isCorrectPassword) {
            throw {
                statusCode: 400,
                message: "Invalid credentials"
            }
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