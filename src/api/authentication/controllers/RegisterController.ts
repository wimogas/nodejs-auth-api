import {IRegisterRequest} from "../../../contracts/authentication/IRegisterRequest";
import RegisterUseCase from "../../../application/authentication/use-cases/RegisterUseCase";
import RegisterPresenter from "../presenters/RegisterPresenter";

export default class RegisterController {

    private _authRepository;
    private _registerPresenter;

    public constructor(
        authRepository,
        response
    ) {
        this._authRepository = authRepository
        this._registerPresenter = new RegisterPresenter(response)
    }

    public async execute(req: any) : Promise<void>{

        // Map Generic HTTP Req Object to RegisterRequest Contract
        const mappedRequest: IRegisterRequest = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const registerUseCase = new RegisterUseCase(
            this._authRepository,
            this._registerPresenter
        )

        await registerUseCase.execute(mappedRequest)

    }
}