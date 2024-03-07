import {container} from './di'
import GetTokenQueryHandler from "../application/queries/get-token/GetTokenQueryHandler";
import GetTokenQueryValidator from "../application/queries/get-token/GetTokenQueryValidator";
import {IHTTPRequest} from "../application/common/interfaces/IHTTPRequest";
import {AuthMapper} from "../application/common/mapper/AuthMapper";
import CreateUserCommandHandler from "../application/commands/create-user/CreateUserCommandHandler";
import CreateUserCommandValidator from "../application/commands/create-user/CreateUserCommandValidator";
import DeleteUserCommandHandler from "../application/commands/delete-user/DeleteUserCommandHandler";
import {AuthorizationService} from "../infrastructure/security/AuthorizationService";
import {AuthPolicy} from "../application/common/security/policy/AuthPolicies";
import {AuthErrors} from "../domain/errors/AuthErrors";
import {singleton} from "tsyringe";

@singleton()
export default class AuthenticationController {

    public async getLoginToken(request: IHTTPRequest): Promise<any>{
        const loginQueryHandler = container.resolve(GetTokenQueryHandler)
        const mappedRequest = AuthMapper.toRequest(request)
        return await loginQueryHandler.execute(mappedRequest)
    }

    public async createUser(request: IHTTPRequest): Promise<any>{
        const registerCommandHandler = container.resolve(CreateUserCommandHandler)
        const mappedRequest = AuthMapper.toRequest(request)
        return await registerCommandHandler.execute(mappedRequest)
    }

    public async deleteUser(request: IHTTPRequest): Promise<any>{
        const deleteUserCommandHandler = container.resolve(DeleteUserCommandHandler)
        await deleteUserCommandHandler.execute(request.params.id)
    }
}