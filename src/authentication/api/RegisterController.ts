import {container} from './di'
import RegisterCommandHandler from "../application/commands/register/RegisterCommandHandler";
import RegisterCommandValidator from "../application/commands/register/RegisterCommandValidator";
import {IHTTPRequest} from "../application/common/interfaces/IHTTPRequest";
import {AuthMapper} from "../application/common/mapper/AuthMapper";

export default class RegisterController {
    private readonly _registerCommandHandler = container.resolve(RegisterCommandHandler)
    private readonly _validator = container.resolve(RegisterCommandValidator);

    public async Register(req: IHTTPRequest): Promise<any>{

        const error = this._validator.validate(req.body)

        if (error) {
            throw error
        }

        const mappedRequest = AuthMapper.toRequest(req)

        return await this._registerCommandHandler.register(mappedRequest)
    }
}