import container from '../../../di'
import LoginQueryHandler from "../../application/authentication/queries/login/LoginQueryHandler";
import LoginQueryValidator from "../../application/authentication/queries/login/LoginQueryValidator";
import {IHTTPRequest} from "../../../common/http/interfaces/IHTTPRequest";
import {AuthMapper} from "../../application/common/mapper/AuthMapper";

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