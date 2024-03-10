import {inject, singleton} from "tsyringe";
import {DeleteUserCommand} from "./DeleteUserCommand";
import {NotFoundError} from "../../../domain/common/errors";
import {IUserRepository} from "../../../database/interfaces/IUserRepository";

@singleton()
export class DeleteUserCommandHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
    ) {}

    public async execute(request: DeleteUserCommand): Promise<void> {

        const foundUser = await this._userRepository.getUserById(request.id)

        if (!foundUser) {
            throw new NotFoundError()
        }

        try {
            await this._userRepository.deleteUser(request.id)
        } catch (error) {
            throw error
        }
    }
}