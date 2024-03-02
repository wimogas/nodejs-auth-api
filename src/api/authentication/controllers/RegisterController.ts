import {IRegisterRequest} from "../../../contracts/authentication/IRegisterRequest";
import RegisterUseCase from "../../../application/authentication/use-cases/RegisterUseCase";
import RegisterPresenter from "../presenters/RegisterPresenter";
import {IAuthRepository} from "../../../application/authentication/interfaces/IAuthRepository";
import {IPresenter} from "../../../application/authentication/interfaces/IPresenter";
import {IOutput} from "../../../infrastructure/web/frameworks/express/outputs/interfaces/IOutput";
import {IHTTPRequest} from "../../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";

export default class RegisterController {

    private readonly _authRepository: IAuthRepository;
    private readonly _registerPresenter: IPresenter;

    public constructor(
        authRepository: IAuthRepository,
        response: IOutput
    ) {
        this._authRepository = authRepository
        this._registerPresenter = new RegisterPresenter(response)
    }

    public async execute(req: IHTTPRequest) : Promise<void>{

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