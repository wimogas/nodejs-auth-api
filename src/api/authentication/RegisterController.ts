import {IHTTPRequest} from "../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import IValidator from "../../application/common/interfaces/IValidator";
import {IRegisterRequest} from "../../contracts/authentication/IRegisterRequest";
import IRegisterCommandService from "../../application/authentication/commands/register/interface/IRegisterCommandService";

export default class RegisterController {

    private readonly _authenticationCommandService: IRegisterCommandService
    private readonly _validator: IValidator;

    public constructor(
        validator: IValidator,
        authenticationCommandService: IRegisterCommandService
    ) {
        this._validator = validator
        this._authenticationCommandService = authenticationCommandService
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