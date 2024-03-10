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

    public async execute(request: CreateUserCommand): Promise<string> {

        const foundUser = await this._userRepository.getUserByEmail(request.email)

        if (foundUser) {
            throw new ConflictError("Email is taken.")
        }

        // get role permissions

        // if role has permissions add to user
        const permissions = []

        const user = await User.create({
            email: request.email,
            password: request.password,
            role: request.role,
            permissions
        })

        console.log(user)

        await this._userRepository.addUser(user)

        return this._tokenProvider.generateToken(user);

    }
}