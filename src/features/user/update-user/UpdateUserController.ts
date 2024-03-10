import {IHTTPRequest, IController} from "../../../interfaces";
import {UpdateUserCommandHandler} from "./UpdateUserCommandHandler";
import container from '../../../di'
import {UpdateUserCommand} from "./UpdateUserCommand";
import {logger} from "../../../decorators/logger";
import {authorize} from "../../../decorators/authorize";
import {PermissionAttribute} from "../../../security";

export class UpdateUserController implements IController {

    @authorize(PermissionAttribute.EditUser)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const updateUserCommandHandler = container.resolve(UpdateUserCommandHandler)
        const updateUserCommand = new UpdateUserCommand(
            request.params.id,
            request.body.email,
            request.body.password,
            request.body.role
        )
        await updateUserCommandHandler.execute(updateUserCommand)
    }
}