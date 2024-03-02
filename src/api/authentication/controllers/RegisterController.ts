import {IRegisterRequest} from "../../../contracts/authentication/IRegisterRequest";
import RegisterUseCase from "../../../application/authentication/use-cases/RegisterUseCase";
import RegisterPresenter from "../presenters/RegisterPresenter";
import {IAuthRepository} from "../../../application/authentication/interfaces/IAuthRepository";
import {IPresenter} from "../../../application/authentication/interfaces/IPresenter";
import {IOutput} from "../../../infrastructure/web/frameworks/express/outputs/interfaces/IOutput";
import {IHTTPRequest} from "../../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import IValidator from "../../../application/authentication/interfaces/IValidator";

export default class RegisterController {

    private readonly _authRepository: IAuthRepository;
    private readonly _registerPresenter: IPresenter;
    private readonly _validator: IValidator;

    public constructor(
        authRepository: IAuthRepository,
        response: IOutput,
        validator: IValidator,
    ) {
        this._authRepository = authRepository
        this._registerPresenter = new RegisterPresenter(response)
        this._validator = validator
    }

    public async execute(req: IHTTPRequest) : Promise<void>{

        const error = this._validator.validate(req)

        if (error) {
            throw {
                statusCode: 400,
                message: error,
            }
        }

        const mappedRequest: IRegisterRequest = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const registerUseCase: RegisterUseCase = new RegisterUseCase(
            this._authRepository,
            this._registerPresenter
        )

        await registerUseCase.execute(mappedRequest)
    }
}