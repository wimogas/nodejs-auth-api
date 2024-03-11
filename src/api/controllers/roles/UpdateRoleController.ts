import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {UpdateRoleCommandHandler, UpdateRoleCommand} from "../../../application/roles";

export class UpdateRoleController implements IController {

    @authorize(Permission.Admin)
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

