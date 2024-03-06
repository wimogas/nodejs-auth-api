import {container} from './di'
import LoginQueryHandler from "../application/queries/login/LoginQueryHandler";
import LoginQueryValidator from "../application/queries/login/LoginQueryValidator";
import {IHTTPRequest} from "../application/common/interfaces/IHTTPRequest";
import {AuthMapper} from "../application/common/mapper/AuthMapper";

export default class LoginController {
    private readonly _loginQueryService = container.resolve(LoginQueryHandler)
    private readonly _validator = container.resolve(LoginQueryValidator);

    public async Login(req: IHTTPRequest): Promise<any>{

        const error = this._validator.validate(req.body)

        if (error) {
            throw error
        }

        const mappedRequest = AuthMapper.toRequest(req)

        return await this._loginQueryService.getLoginToken(mappedRequest)

    }
}