import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {CreateRoleCommandHandler} from "../../../application/roles";
import {CreateRoleCommand} from "../../../application/roles/commands/create-role/CreateRoleCommand";

export class CreateRoleController implements IController {

    @authorize(Permission.CreateRole)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const createRoleCommandHandler = container.resolve(CreateRoleCommandHandler)

        const createRoleCommand = new CreateRoleCommand(
            request.body.name
        )

        await createRoleCommandHandler.execute(createRoleCommand)
    }
}

