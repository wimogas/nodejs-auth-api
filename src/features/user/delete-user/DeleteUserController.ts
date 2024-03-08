import container from '../../../di'
import {IHTTPRequest} from "../../../interfaces/IHTTPRequest";
import {singleton} from "tsyringe";
import DeleteUserCommandHandler from "./DeleteUserCommandHandler";
import {DeleteUserCommand} from "./DeleteUserCommand";
import {UnauthorizedError} from "../../../domain/errors/UnauthorizedError";

@singleton()
export default class DeleteUserController {

    public async execute(request: IHTTPRequest): Promise<void>{

        const deleteUserCommandHandler = container.resolve(DeleteUserCommandHandler)

        const token = request.headers && request.headers.authorization ? request.headers.authorization.split(" ")[1] : ""

        if (!token) {
            throw new UnauthorizedError()
        }

        const deleteUserCommand = new DeleteUserCommand(
            request.params.id,
            token
        )

        await deleteUserCommandHandler.execute(deleteUserCommand)
    }
}