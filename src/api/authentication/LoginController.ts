import {IHTTPRequest} from "../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import IValidator from "../../application/common/interfaces/IValidator";
import {ILoginRequest} from "../../contracts/authentication/ILoginRequest";
import ILoginQueryService from "../../application/authentication/queries/login/interface/ILoginQueryService";

export default class LoginController {

    private readonly _authenticationQueryService: ILoginQueryService
    private readonly _validator: IValidator;

    public constructor(
        validator: IValidator,
        authenticationQueryService: ILoginQueryService,
    ) {
        this._validator = validator
        this._authenticationQueryService = authenticationQueryService
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

        await this._authenticationQueryService.getLoginTokenQuery(mappedRequest)
    }
}