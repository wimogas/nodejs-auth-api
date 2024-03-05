import container from '../../infrastructure/web/di'
import {IHTTPRequest} from "../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import IRegisterRequest from "../../contracts/authentication/IRegisterRequest";
import RegisterCommandHandler from "../../application/authentication/commands/register/RegisterCommandHandler";
import RegisterCommandValidator from "../../application/authentication/commands/register/RegisterCommandValidator";

export default class RegisterController {
    private readonly _registerCommandHandler = container.resolve(RegisterCommandHandler)
    private readonly _validator = container.resolve(RegisterCommandValidator);

    public async Register(req: IHTTPRequest): Promise<any>{

        const error = this._validator.validate(req.body)

        if (error) {
            throw error
        }

        const mappedRequest: IRegisterRequest = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        return await this._registerCommandHandler.register(mappedRequest)
    }
}