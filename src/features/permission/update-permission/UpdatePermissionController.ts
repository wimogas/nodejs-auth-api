import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {UpdatePermissionCommandHandler} from "./UpdatePermissionCommandHandler";
import {UpdatePermissionCommand} from "./UpdatePermissionCommand";
import {logger} from "../../../decorators/logger";
import {authorize} from "../../../decorators/authorize";
import {PermissionAttribute} from "../../../security";

export class UpdatePermissionController implements IController {

    @authorize(PermissionAttribute.CreateAuth)
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

