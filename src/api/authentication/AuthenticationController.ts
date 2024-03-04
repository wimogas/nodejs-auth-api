import {IHTTPRequest} from "../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import IValidator from "../../application/common/interfaces/IValidator";
import {ILoginRequest} from "../../contracts/authentication/ILoginRequest";
import {IRegisterRequest} from "../../contracts/authentication/IRegisterRequest";
import IAuthenticationQueryService
    from "../../application/authentication/queries/interface/IAuthenticationQueryService";
import IAuthenticationCommandService
    from "../../application/authentication/commands/interface/IAuthenticationCommandService";

export default class AuthenticationController {

    private readonly _authenticationQueryService: IAuthenticationQueryService
    private readonly _authenticationCommandService: IAuthenticationCommandService
    private readonly _validator: IValidator;

    public constructor(
        validator: IValidator,
        authenticationQueryService: IAuthenticationQueryService,
        authenticationCommandService: IAuthenticationCommandService
    ) {
        this._validator = validator
        this._authenticationQueryService = authenticationQueryService
        this._authenticationCommandService = authenticationCommandService
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

    public async Register(req: IHTTPRequest): Promise<void>{

        const error = this._validator.validate(req.body)

        if (error) {
            throw error
        }

        const mappedRequest: IRegisterRequest = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        await this._authenticationCommandService.register(mappedRequest)
    }
}