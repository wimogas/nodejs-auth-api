import {singleton} from "tsyringe";
import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {DeleteUserCommandHandler} from "./DeleteUserCommandHandler";
import {DeleteUserCommand} from "./DeleteUserCommand";

@singleton()
export class DeleteUserController implements IController{

    public async execute(request: IHTTPRequest): Promise<void>{
        const deleteUserCommandHandler = container.resolve(DeleteUserCommandHandler)

        const deleteUserCommand = new DeleteUserCommand(
            request.params.id,
            request.user
        )

        await deleteUserCommandHandler.execute(deleteUserCommand)
    }
}