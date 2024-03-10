import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {DeleteUserCommandHandler} from "../../../application/users";
import {DeleteUserCommand} from "../../../application/users/commands/delete-user/DeleteUserCommand";


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