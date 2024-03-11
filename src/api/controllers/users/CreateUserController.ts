import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {CreateUserCommandHandler, CreateUserCommand} from "../../../application/users";

export class CreateUserController implements IController {
    @logger
    public async execute(request: IHTTPRequest): Promise<any>{
        const createUserCommandHandler = container.resolve(CreateUserCommandHandler)

        const createUserCommand = new CreateUserCommand(
            request.body.email,
            request.body.password,
            request.body.role
        )

        return await createUserCommandHandler.execute(createUserCommand)
    }
}