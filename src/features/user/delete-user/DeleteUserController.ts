import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {DeleteUserCommandHandler} from "./DeleteUserCommandHandler";
import {DeleteUserCommand} from "./DeleteUserCommand";
import {PermissionAttribute} from "../../../security";
import {authorize} from "../../../decorators/authorize";
import {logger} from "../../../decorators/logger";

export class DeleteUserController implements IController{
    @authorize(PermissionAttribute.DeleteUser)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{

        const deleteUserCommandHandler = container.resolve(DeleteUserCommandHandler)

        const deleteUserCommand = new DeleteUserCommand(
            request.params.id,
            request.user
        )

        await deleteUserCommandHandler.execute(deleteUserCommand)
    }
}