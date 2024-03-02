import User from "../../../domain/User";
import {IAuthenticationResponse} from "../../../contracts/authentication/IAuthenticationResponse";
import {IAuthRepository} from "../interfaces/IAuthRepository";
import {IPresenter} from "../interfaces/IPresenter";
import {IRegisterRequest} from "../../../contracts/authentication/IRegisterRequest";

export default class RegisterUseCase {

    private _authRepository: IAuthRepository;
    private _registerPresenter: IPresenter;
    public constructor(
        authRepository: IAuthRepository,
        authPresenter: IPresenter
    ) {
        this._authRepository = authRepository
        this._registerPresenter = authPresenter
    }

    public async execute(request: IRegisterRequest): Promise<void> {

        const newUser = User.create({
            name: request.name,
            email: request.email,
            password: request.password
        }, '')

        try {
            const user = await this._authRepository.addUser(newUser)

            const authenticationResponse: IAuthenticationResponse = {
                id: user.id,
                name: user.getName,
                email: user.getEmail,
                token: 'eyJhbGciOiJSUzI1NjA4NDc'
            }

            this._registerPresenter.present(authenticationResponse)

        } catch (error) {
            throw new Error("Unhandled error occurred")
        }
    }
}