import {inject, singleton} from "tsyringe";
import {IUserRepository} from "../../../interfaces";
import {ITokenProvider} from "../../../../infrastructure/security/tokens/ITokenProvider";
import {CreateUserCommand} from "./CreateUserCommand";
import {ConflictError} from "../../../../domain/common/errors";
import {User} from "../../../../domain/user";


@singleton()
export class CreateUserCommandHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        @inject("tokenProvider") private _tokenProvider: ITokenProvider
        ) {}

    public async execute(command: CreateUserCommand): Promise<any> {

        const foundUser = await this._userRepository.getUserByEmail(command.email)

        if (foundUser) {
            throw new ConflictError("Email is taken.")
        }

        const user = await User.create({
            email: command.email,
            password: command.password,
            role: command.roleId
        })

        let createdUser = await this._userRepository.addUser(user)

        let permissions = createdUser.role.permissions.map((perm: any) => perm.name).join(",")

        return this._tokenProvider.generateToken({
            id: createdUser._id,
            email: createdUser.email,
            role: createdUser.role.name,
            permissions
        });

    }
}