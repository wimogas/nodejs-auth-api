import {container} from './di'
import GetTokenQueryHandler from "../application/queries/get-token/GetTokenQueryHandler";
import GetTokenQueryValidator from "../application/queries/get-token/GetTokenQueryValidator";
import {IHTTPRequest} from "../application/common/interfaces/IHTTPRequest";
import {AuthMapper} from "../application/common/mapper/AuthMapper";
import CreateUserCommandHandler from "../application/commands/create-user/CreateUserCommandHandler";
import CreateUserCommandValidator from "../application/commands/create-user/CreateUserCommandValidator";
import DeleteUserCommandHandler from "../application/commands/delete-user/DeleteUserCommandHandler";
import DeleteUserCommandValidator from "../application/commands/delete-user/DeleteUserCommandValidator";
import {IHTTPVerifiedRequest} from "../application/common/interfaces/IHTTPVerifiedRequest";

export default class AuthenticationController {

    public async getLoginToken(request: IHTTPRequest): Promise<any>{

        const loginQueryHandler = container.resolve(GetTokenQueryHandler)
        const validator = container.resolve(GetTokenQueryValidator);

        const error = validator.validate(request.body)

        if (error) {
            throw error
        }

        const mappedRequest = AuthMapper.toRequest(request)

        return await loginQueryHandler.execute(mappedRequest)
    }
    public async createUser(request: IHTTPRequest): Promise<any>{

        const registerCommandHandler = container.resolve(CreateUserCommandHandler)
        const validator = container.resolve(CreateUserCommandValidator);

        const error = validator.validate(request.body)

        if (error) {
            throw error
        }

        const mappedRequest = AuthMapper.toRequest(request)

        return await registerCommandHandler.execute(mappedRequest)
    }
    public async deleteUser(request: IHTTPVerifiedRequest): Promise<any>{

        const deleteUserCommandHandler = container.resolve(DeleteUserCommandHandler)
        const validator = container.resolve(DeleteUserCommandValidator);

        const error = validator.validate(request)

        if (error) {
            throw error
        }

         await deleteUserCommandHandler.execute(request.params)
    }
}