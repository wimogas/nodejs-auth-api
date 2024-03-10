import {inject, singleton} from "tsyringe";
import {ConflictError} from "../../../domain/common/errors";
import {User} from "../../../domain/user";
import {CreateUserCommand} from "./CreateUserCommand";
import {IUserRepository} from "../../../database/interfaces/IUserRepository";
import {ITokenProvider} from "../../../services/ITokenProvider";

@singleton()
export class CreateUserCommandHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        @inject("tokenProvider") private _tokenProvider: ITokenProvider
        ) {}

    public async execute(request: CreateUserCommand): Promise<any> {

        const foundUser = await this._userRepository.getUserByEmail(request.email)

        if (foundUser) {
            throw new ConflictError("Email is taken.")
        }

        const user = await User.create({
            email: request.email,
            password: request.password,
            role: request.role,
        })

        console.log(user)

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