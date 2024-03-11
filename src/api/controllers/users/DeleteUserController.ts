import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {DeleteUserCommandHandler, DeleteUserCommand} from "../../../application/users";

export class DeleteUserController implements IController{
    @authorize(Permission.DeleteUser)
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