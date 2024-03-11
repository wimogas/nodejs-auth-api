import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {CreatePermissionCommandHandler, CreatePermissionCommand} from "../../../application/permissions";

export class CreatePermissionController implements IController {
    @authorize(Permission.Admin)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const createPermissionCommandHandler = container.resolve(CreatePermissionCommandHandler)

        const createPermissionCommand = new CreatePermissionCommand(
            request.body.name
        )

        await createPermissionCommandHandler.execute(createPermissionCommand)
    }
}

