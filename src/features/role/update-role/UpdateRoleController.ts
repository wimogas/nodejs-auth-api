import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {UpdateRoleCommandHandler} from "./UpdateRoleCommandHandler";
import {UpdateRoleCommand} from "./UpdateRoleCommand";
import {logger} from "../../../decorators/logger";
import {authorize} from "../../../decorators/authorize";
import {PermissionAttribute} from "../../../security";

export class UpdateRoleController implements IController {

    @authorize(PermissionAttribute.EditRole)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const updateRoleCommandHandler = container.resolve(UpdateRoleCommandHandler)

        const updateRoleCommand = new UpdateRoleCommand(
            request.params.id,
            request.body.changes,
        )

        await updateRoleCommandHandler.execute(updateRoleCommand)
    }
}

