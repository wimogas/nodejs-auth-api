import {singleton} from "tsyringe";
import {IHTTPRequest, IController} from "../../../interfaces";
import {UpdateUserCommandHandler} from "./UpdateUserCommandHandler";
import container from '../../../di'
import {UpdateUserCommand} from "./UpdateUserCommand";

@singleton()
export class UpdateUserController implements IController {

    public async execute(request: IHTTPRequest): Promise<void>{
        const updateUserCommandHandler = container.resolve(UpdateUserCommandHandler)
        const updateUserCommand = new UpdateUserCommand(
            request.params.id,
            request.body.email,
            request.body.password
        )
        await updateUserCommandHandler.execute(updateUserCommand)
    }
}