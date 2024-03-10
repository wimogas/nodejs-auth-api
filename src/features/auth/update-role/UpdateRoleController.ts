import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {UpdateRoleCommandHandler} from "./UpdateRoleCommandHandler";
import {UpdateRoleCommand} from "./UpdateRoleCommand";
import {logger} from "../../../decorators/logger";

export class UpdateRoleController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const updateRoleCommandHandler = container.resolve(UpdateRoleCommandHandler)

        const updateRoleCommand = new UpdateRoleCommand(
            request.params.id,
            request.body.permission,
        )

        console.log(updateRoleCommand)

        await updateRoleCommandHandler.execute(updateRoleCommand)
    }
}

