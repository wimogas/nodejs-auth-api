import {singleton} from "tsyringe";
import {IHTTPRequest, IController} from "../../../interfaces";
import {CreateUserCommandHandler} from "./CreateUserCommandHandler";
import container from '../../../di'
import {CreateUserCommand} from "./CreateUserCommand";

@singleton()
export class CreateUserController implements IController {

    public async execute(request: IHTTPRequest): Promise<string>{
        const createUserCommandHandler = container.resolve(CreateUserCommandHandler)
        const createUserCommand = new CreateUserCommand(
            request.body.email,
            request.body.password
        )
        return await createUserCommandHandler.execute(createUserCommand)
    }
}