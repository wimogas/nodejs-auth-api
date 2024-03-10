import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {DeleteRoleCommandHandler} from "./DeleteRoleCommandHandler";
import {DeleteRoleCommand} from "./DeleteRoleCommand";
import {logger} from "../../../decorators/logger";
import {PermissionAttribute} from "../../../security";
import {authorize} from "../../../decorators/authorize";

export class DeleteRoleController implements IController {

    @authorize(PermissionAttribute.CreateAuth)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{

        const createPermissionCommandHandler = container.resolve(DeleteRoleCommandHandler)

        const createPermissionCommand = new DeleteRoleCommand(
            request.params.id
        )

        await createPermissionCommandHandler.execute(createPermissionCommand)
    }
}

