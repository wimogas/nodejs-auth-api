import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {CreatePermissionCommandHandler} from "./CreatePermissionCommandHandler";
import {CreatePermissionCommand} from "./CreatePermissionCommand";
import {logger} from "../../../decorators/logger";
import {authorize} from "../../../decorators/authorize";
import {PermissionAttribute} from "../../../security";

export class CreatePermissionController implements IController {
    @authorize(PermissionAttribute.CreateAuth)

    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const createPermissionCommandHandler = container.resolve(CreatePermissionCommandHandler)

        const createPermissionCommand = new CreatePermissionCommand(
            request.body.name
        )

        await createPermissionCommandHandler.execute(createPermissionCommand)
    }
}

