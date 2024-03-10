import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {UpdateRoleCommandHandler} from "../../../application/roles";
import {UpdateRoleCommand} from "../../../application/roles/commands/update-role/UpdateRoleCommand";

export class UpdateRoleController implements IController {

    @authorize(Permission.CreateAuth)
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

