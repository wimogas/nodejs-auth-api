import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "../../../interfaces/IAuthRepository";
import {User} from "../../../domain/user/User";
import {IIdGeneratorService} from "../../../interfaces/IIdGeneratorService";
import {ConflictError} from "../../../domain/errors/ConflictError";
import {ITokenService} from "../../../interfaces/ITokenService";
import {CreateUserCommand} from "./CreateUserCommand";

@singleton()
export default class CreateUserCommandHandler {

    public constructor(
        @inject("authRepository") private _authRepository: IAuthRepository,
        @inject("idGenerator") private _idGenerator: IIdGeneratorService,
        @inject("tokenService") private _tokenService: ITokenService
        ) {}

    public async execute(request: CreateUserCommand): Promise<string> {

        const foundUser = await this._authRepository.getAuthUserByEmail(request.email)

        if (foundUser) {
            throw new ConflictError("Email is already in use.")
        }

        const user = await User.create({
            id: this._idGenerator.generateId(),
            email: request.email,
            password: request.password
        })

        await this._authRepository.addAuthUser(user)

        return this._tokenService.generateToken(user);

    }
}