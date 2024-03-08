import {singleton} from "tsyringe";
import {IHTTPRequest} from "../../../interfaces/IHTTPRequest";
import UpdateUserCommandHandler from "./UpdateUserCommandHandler";
import container from '../../../di'
import {UpdateUserCommand} from "./UpdateUserCommand";

@singleton()
export default class UpdateUserController {

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