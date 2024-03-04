import {IHTTPRequest} from "../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import IValidator from "../../application/common/interfaces/IValidator";
import {ILoginRequest} from "../../contracts/authentication/ILoginRequest";
import ILoginQueryHandler from "../../application/authentication/queries/login/interface/ILoginQueryHandler";

export default class LoginController {

    private readonly _loginQueryHandler: ILoginQueryHandler
    private readonly _validator: IValidator;

    public constructor(
        validator: IValidator,
        loginQueryHandler: ILoginQueryHandler,
    ) {
        this._validator = validator
        this._loginQueryHandler = loginQueryHandler
    }

    public async Login(req: IHTTPRequest): Promise<void>{

        const error = this._validator.validate(req.body)

        if (error) {
            throw error
        }

        const mappedRequest: ILoginRequest = {
            email: req.body.email,
            password: req.body.password
        }

        await this._loginQueryHandler.getLoginToken(mappedRequest)
    }
}