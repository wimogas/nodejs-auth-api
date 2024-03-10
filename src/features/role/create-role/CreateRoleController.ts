import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {CreateRoleCommandHandler} from "./CreateRoleCommandHandler";
import {CreateRoleCommand} from "./CreateRoleCommand";
import {logger} from "../../../decorators/logger";
import {PermissionAttribute} from "../../../security";
import {authorize} from "../../../decorators/authorize";

export class CreateRoleController implements IController {

    @authorize(PermissionAttribute.CreateAuth)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const createRoleCommandHandler = container.resolve(CreateRoleCommandHandler)

        const createRoleCommand = new CreateRoleCommand(
            request.body.name
        )

        await createRoleCommandHandler.execute(createRoleCommand)
    }
}

