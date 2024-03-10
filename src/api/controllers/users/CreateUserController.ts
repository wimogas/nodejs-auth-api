import {singleton} from "tsyringe";
import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {CreateUserCommandHandler} from "../../../application/users";
import {CreateUserCommand} from "../../../application/users/commands/create-user/CreateUserCommand";
import {Role} from "../../../application/common/security";

export class CreateUserController implements IController {
    @logger
    public async execute(request: IHTTPRequest): Promise<string>{
        const createUserCommandHandler = container.resolve(CreateUserCommandHandler)

        const createUserCommand = new CreateUserCommand(
            request.body.email,
            request.body.password,
            request.body.role
        )

        return await createUserCommandHandler.execute(createUserCommand)
    }
}