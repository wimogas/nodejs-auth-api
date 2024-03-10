import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {DeletePermissionCommandHandler} from "./DeletePermissionCommandHandler";
import {DeletePermissionCommand} from "./DeletePermissionCommand";
import {logger} from "../../../decorators/logger";
import {authorize} from "../../../decorators/authorize";
import {PermissionAttribute} from "../../../security";

export class DeletePermissionController implements IController {
    @authorize(PermissionAttribute.CreateAuth)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const deletePermissionCommandHandler = container.resolve(DeletePermissionCommandHandler)

        const deletePermissionCommand = new DeletePermissionCommand(
            request.params.id
        )

        await deletePermissionCommandHandler.execute(deletePermissionCommand)
    }
}

