import {inject, singleton} from "tsyringe";
import {UpdateUserRoleCommand} from "./UpdateUserRoleCommand";
import {IUserRepository} from "../../../interfaces";
import {ConflictError, NotFoundError} from "../../../../domain/common/errors";


@singleton()
export class UpdateUserRoleCommandHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        ) {}

    public async execute(request: UpdateUserRoleCommand): Promise<void> {

        const foundUser = await this._userRepository.getUserById(request.id)

        if (!foundUser) {
            throw new NotFoundError("User not found.")
        }

        const updatedUser = {
            id: foundUser._id.toString(),
            role: request.role
        }


        await this._userRepository.updateUserRole(updatedUser)

    }
}