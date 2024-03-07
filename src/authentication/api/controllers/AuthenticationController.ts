import {singleton} from "tsyringe";
import {container} from '../di'
import GetTokenQueryHandler from "../../application/queries/get-token/GetTokenQueryHandler";
import {IHTTPRequest} from "../../application/common/interfaces/IHTTPRequest";
import CreateUserCommandHandler from "../../application/commands/create-user/CreateUserCommandHandler";
import DeleteUserCommandHandler from "../../application/commands/delete-user/DeleteUserCommandHandler";
import IAuthenticationResponse from "../../contracts/IAuthenticationResponse";
import {Error} from "../../domain/errors/Error";
import IGetTokenRequest from "../../contracts/IGetTokenRequest";

@singleton()
export default class AuthenticationController {

    public async createUser(request: IHTTPRequest): Promise<Error|IAuthenticationResponse>{
        const createUserCommandHandler = container.resolve(CreateUserCommandHandler)

        const createUserRequest = {
            email: request.body.email,
            password: request.body.password,
            permissions: request.body.permissions,
            roles: request.body.roles
        }

        return await createUserCommandHandler.execute(createUserRequest)
    }

    public async getLoginToken(request: IHTTPRequest): Promise<IAuthenticationResponse>{
        const getTokenQueryHandler = container.resolve(GetTokenQueryHandler)

        const getTokenRequest: IGetTokenRequest = {
            email: request.body.email,
            password: request.body.password
        }

        return await getTokenQueryHandler.execute(getTokenRequest)
    }

    public async deleteUser(request: IHTTPRequest): Promise<void>{
        const deleteUserCommandHandler = container.resolve(DeleteUserCommandHandler)
        await deleteUserCommandHandler.execute(request.params.id)
    }
}