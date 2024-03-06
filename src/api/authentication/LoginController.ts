import container from '../../infrastructure/web/di'
import {IHTTPRequest} from "../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import IAuthenticationRequest from "../../contracts/authentication/IAuthenticationRequest";
import LoginQueryHandler from "../../application/authentication/queries/login/LoginQueryHandler";
import LoginQueryValidator from "../../application/authentication/queries/login/LoginQueryValidator";

export default class LoginController {
    private readonly _loginQueryService = container.resolve(LoginQueryHandler)
    private readonly _validator = container.resolve(LoginQueryValidator);

    public async Login(req: IHTTPRequest): Promise<any>{

        const error = this._validator.validate(req.body)

        if (error) {
            throw error
        }

        const mappedRequest: IAuthenticationRequest = {
            email: req.body.email,
            password: req.body.password
        }

        return await this._loginQueryService.getLoginToken(mappedRequest)

    }
}