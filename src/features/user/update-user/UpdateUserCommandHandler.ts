import {inject, singleton} from "tsyringe";
import {IUserRepository} from "../../../interfaces/IUserRepository";
import {User} from "../../../domain/user/User";
import {UpdateUserCommand} from "./UpdateUserCommand";
import {NotFoundError} from "../../../domain/errors/NotFoundError";
import {ICryptoService} from "../../../interfaces/ICryptoService";
import {Password} from "../../../domain/user/fields/Password";
import {Email} from "../../../domain/user/fields/Email";
import {ConflictError} from "../../../domain/errors/ConflictError";

@singleton()
export default class UpdateUserCommandHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        @inject("cryptoService") private _cryptoService: ICryptoService,
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

        const updatedUser = await User.create({
            id: foundUser._id.toString(),
            email: request.email,
            password: request.password
        })

        await this._userRepository.updateUser(updatedUser)

    }
}