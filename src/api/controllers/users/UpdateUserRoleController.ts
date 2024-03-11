import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {authorize} from "../../../infrastructure/security";
import {Permission} from "../../../application/common/security";
import {logger} from "../../../infrastructure/services";
import {UpdateUserCommandHandler, UpdateUserCommand} from "../../../application/users";
import {
    UpdateUserRoleCommandHandler
} from "../../../application/users/commands/update-user-role/UpdateUserRoleCommandHandler";
import {UpdateUserRoleCommand} from "../../../application/users/commands/update-user-role/UpdateUserRoleCommand";

export class UpdateUserRoleController implements IController {

    @authorize(Permission.Admin)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const updateUserRoleCommandHandler = container.resolve(UpdateUserRoleCommandHandler)
        const updateUserRoleCommand = new UpdateUserRoleCommand(
            request.params.id,
            request.body.role
        )
        await updateUserRoleCommandHandler.execute(updateUserRoleCommand)
    }
}