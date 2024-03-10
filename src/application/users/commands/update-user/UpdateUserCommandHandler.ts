import {inject, singleton} from "tsyringe";
import {UpdateUserCommand} from "./UpdateUserCommand";
import {IUserRepository} from "../../../interfaces";
import {ConflictError, NotFoundError} from "../../../../domain/common/errors";


@singleton()
export class UpdateUserCommandHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        ) {}

    public async execute(request: UpdateUserCommand): Promise<void> {

        const foundUser = await this._userRepository.getUserById(request.id)

        if (!foundUser) {
            throw new NotFoundError("User not found.")
        }

        const emailExists = await this._userRepository.getUserByEmail(request.email)

        if (emailExists) {
            throw new ConflictError("Email is taken.")
        }

        const updatedUser = {
            id: foundUser._id.toString(),
            email: request.email,
            password: request.password,
            role: request.role
        }


        await this._userRepository.updateUser(updatedUser)

    }
}