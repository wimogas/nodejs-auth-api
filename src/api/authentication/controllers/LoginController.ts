import LoginCommand from "../../../application/authentication/commands/LoginCommand";
import RegisterPresenter from "../presenters/RegisterPresenter";
import {IAuthRepository} from "../../../application/authentication/interfaces/IAuthRepository";
import {IPresenter} from "../../../application/authentication/interfaces/IPresenter";
import {IOutput} from "../../../infrastructure/web/frameworks/express/outputs/interfaces/IOutput";
import {IHTTPRequest} from "../../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import IValidator from "../../../application/authentication/interfaces/IValidator";
import {TokenService} from "../../../infrastructure/security/TokenService";
import {ILoginRequest} from "../../../contracts/authentication/ILoginRequest";

export default class LoginController {

    private readonly _authRepository: IAuthRepository;
    private readonly _loginPresenter: IPresenter;
    private readonly _validator: IValidator;

    public constructor(
        authRepository: IAuthRepository,
        response: IOutput,
        validator: IValidator,
    ) {
        this._authRepository = authRepository
        this._loginPresenter = new RegisterPresenter(response)
        this._validator = validator
    }

    public async execute(req: IHTTPRequest) : Promise<void>{

        const error = this._validator.validate(req.body)

        if (error) {
            throw {
                statusCode: 400,
                message: error,
            }
        }

        const mappedRequest: ILoginRequest = {
            email: req.body.email,
            password: req.body.password
        }

        const jwtTokenGenerator = new TokenService()

        const loginCommand = new LoginCommand(
            this._authRepository,
            this._loginPresenter,
            jwtTokenGenerator
        )

        await loginCommand.execute(mappedRequest)
    }
}