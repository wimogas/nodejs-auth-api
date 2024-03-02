import User from "../../../domain/User";
import {IAuthenticationResponse} from "../../../contracts/authentication/IAuthenticationResponse";

export default class RegisterUseCase {

    private _authRepository;
    private _registerPresenter;
    public constructor(
        authRepository,
        authPresenter
    ) {
        this._authRepository = authRepository
        this._registerPresenter = authPresenter
    }

    public async execute(request) {

        const newUser = User.create({
            name: request.name,
            email: request.email,
            password: request.password
        }, '')

        try {

            const user = await this._authRepository.addUser(newUser)

            //Map Domain Entity to Response Contract
            const authenticationResponse: IAuthenticationResponse = {
                id: user.id,
                name: user.getName,
                email: user.getEmail,
                token: 'eyJhbGciOiJSUzI1NjA4NDc'
            }

            await this._registerPresenter.present(authenticationResponse)

        } catch (error) {
            throw new Error("Unhandled error occurred")
        }


    }

}