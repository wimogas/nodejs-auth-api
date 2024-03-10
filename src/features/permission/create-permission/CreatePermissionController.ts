import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {CreatePermissionCommandHandler} from "./CreatePermissionCommandHandler";
import {CreatePermissionCommand} from "./CreatePermissionCommand";
import {logger} from "../../../decorators/logger";

export class CreatePermissionController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const createPermissionCommandHandler = container.resolve(CreatePermissionCommandHandler)

        const createPermissionCommand = new CreatePermissionCommand(
            request.body
        )

        await createPermissionCommandHandler.execute(createPermissionCommand)
    }
}

