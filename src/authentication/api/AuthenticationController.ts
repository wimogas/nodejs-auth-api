import {singleton} from "tsyringe";
import {container} from './di'
import GetTokenQueryHandler from "../application/GetTokenQueryHandler";
import {IHTTPRequest} from "../application/common/interfaces/IHTTPRequest";
import CreateUserCommandHandler from "../application/CreateUserCommandHandler";
import DeleteUserCommandHandler from "../application/DeleteUserCommandHandler";
import IAuthenticationResponse from "../contracts/IAuthenticationResponse";
import IGetTokenRequest from "../contracts/IGetTokenRequest";
import {UnauthorizedError} from "../../common/domain/models/Errors/UnauthorizedError";

@singleton()
export default class AuthenticationController {

    public async createUser(request: IHTTPRequest): Promise<IAuthenticationResponse>{

        const createUserCommandHandler = container.resolve(CreateUserCommandHandler)

        const createUserRequest = {
            email: request.body.email,
            password: request.body.password,
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

        const token = request.headers && request.headers.authorization ? request.headers.authorization.split(" ")[1] : ""

        if (!token) {
            throw new UnauthorizedError()
        }

        const deleteUserRequest = {
            id: request.params.id,
            token
        }

        await deleteUserCommandHandler.execute(deleteUserRequest)
    }
}