import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "./common/interfaces/IAuthRepository";
import IAuthenticationRequest from "../contracts/IAuthenticationRequest";
import {User} from "../domain/User";
import {IIdGeneratorService} from "./common/interfaces/IIdGeneratorService";
import {ConflictError} from "../../common/domain/models/Errors/ConflictError";
import IAuthenticationResponse from "../contracts/IAuthenticationResponse";
import {ITokenService} from "./common/interfaces/ITokenService";

@singleton()
export default class CreateUserCommandHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
        @inject("idGenerator") private idGenerator: IIdGeneratorService,
        @inject("tokenService") private tokenService: ITokenService
        ) {}

    public async execute(request: IAuthenticationRequest): Promise<IAuthenticationResponse> {

        const foundUser = await this.authRepository.getAuthUserByEmail(request.email)

        if (foundUser) {
            throw new ConflictError("Email is already in use.")
        }

        const newUser = await User.create({
            id: this.idGenerator.generateId(),
            email: request.email,
            password: request.password
        })

        await this.authRepository.addAuthUser(newUser)

        const token = this.tokenService.generateToken(newUser);

        return {
            token
        }
    }
}