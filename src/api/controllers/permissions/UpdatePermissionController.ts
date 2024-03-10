import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {UpdatePermissionCommandHandler} from "../../../application/permissions";
import {
    UpdatePermissionCommand
} from "../../../application/permissions/commands/update-permission/UpdatePermissionCommand";


export class UpdatePermissionController implements IController {

    @authorize(Permission.CreateAuth)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const updateRoleCommandHandler = container.resolve(UpdatePermissionCommandHandler)

        const updateRoleCommand = new UpdatePermissionCommand(
            request.params.id,
            request.body.name,
        )

        await updateRoleCommandHandler.execute(updateRoleCommand)
    }
}

