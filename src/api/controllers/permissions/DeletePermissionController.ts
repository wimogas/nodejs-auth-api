import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {DeletePermissionCommandHandler} from "../../../application/permissions";
import {
    DeletePermissionCommand
} from "../../../application/permissions/commands/delete-permission/DeletePermissionCommand";


export class DeletePermissionController implements IController {
    @authorize(Permission.CreateAuth)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const deletePermissionCommandHandler = container.resolve(DeletePermissionCommandHandler)

        const deletePermissionCommand = new DeletePermissionCommand(
            request.params.id
        )

        await deletePermissionCommandHandler.execute(deletePermissionCommand)
    }
}

