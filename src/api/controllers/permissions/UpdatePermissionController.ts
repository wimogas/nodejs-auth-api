import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {UpdatePermissionCommandHandler, UpdatePermissionCommand} from "../../../application/permissions";

export class UpdatePermissionController implements IController {

    @authorize(Permission.EditPermission)
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

