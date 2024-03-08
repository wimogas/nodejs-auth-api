import {inject, singleton} from "tsyringe";
import {IUserRepository} from "../../../interfaces/IUserRepository";
import {User} from "../../../domain/user/User";
import {IIdGeneratorService} from "../../../interfaces/IIdGeneratorService";
import {ITokenService} from "../../../interfaces/ITokenService";
import {CreateUserCommand} from "./CreateUserCommand";
import {ConflictError} from "../../../domain/errors/ConflictError";

@singleton()
export default class CreateUserCommandHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        @inject("idGenerator") private _idGenerator: IIdGeneratorService,
        @inject("tokenService") private _tokenService: ITokenService
        ) {}

    public async execute(request: CreateUserCommand): Promise<string> {

        const foundUser = await this._userRepository.getUserByEmail(request.email)

        if (foundUser) {
            throw new ConflictError("Email is taken.")
        }

        const user = await User.create({
            id: this._idGenerator.generateId(),
            email: request.email,
            password: request.password
        })

        await this._userRepository.addUser(user)

        return this._tokenService.generateToken(user);

    }
}