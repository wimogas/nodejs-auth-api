import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {CreateRoleCommandHandler, CreateRoleCommand} from "../../../application/roles";

export class CreateRoleController implements IController {

    @authorize(Permission.Admin)
    @logger
    public async execute(request: IHTTPRequest): Promise<any>{
        const createRoleCommandHandler = container.resolve(CreateRoleCommandHandler)

        const createRoleCommand = new CreateRoleCommand(
            request.body.name
        )

        return await createRoleCommandHandler.execute(createRoleCommand)
    }
}

