import {inject, singleton} from "tsyringe";
import {AuthUser} from "../../../domain/AuthUser";
import {IAuthRepository} from "../../common/interfaces/IAuthRepository";
import {ITokenService} from "../../common/interfaces/ITokenService";
import {ICryptoService} from "../../common/interfaces/ICryptoService";
import {IIdGeneratorService} from "../../common/interfaces/IIdGeneratorService";
import IAuthenticationRequest from "../../../contracts/IAuthenticationRequest";
import {AuthenticationPermission} from "../../common/security/permissions/AuthenticationPermissions";
import {AuthenticationRole} from "../../common/security/roles/AuthenticationRoles";
import IAuthenticationResponse from "../../../contracts/IAuthenticationResponse";
import {Error} from "../../../domain/errors/Error";

@singleton()
export default class CreateUserCommandHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
        @inject("tokenService") private tokenService: ITokenService,
        @inject("cryptoService") private cryptoService: ICryptoService,
        @inject("idGenerator") private idGenerator: IIdGeneratorService
    ) {}

    public async execute(request: IAuthenticationRequest): Promise<Error|IAuthenticationResponse> {

        const foundUser = await this.authRepository.getAuthUserByEmail(request.email)

        if (foundUser) {
            throw Error.Conflict("Email already exists")
        }

        const hashedPassword = await this.cryptoService.handleHash(request.password, 10)

        const id = this.idGenerator.generateId()

        const newUser = AuthUser.create(
            id,
            request.email,
            hashedPassword,
            request.permissions ? request.permissions : `${AuthenticationPermission.Edit},${AuthenticationPermission.Delete}`,
            request.roles ? request.roles : AuthenticationRole.User
        )


        await this.authRepository.addAuthUser(newUser)

        const token = this.tokenService.generateToken(newUser);

        return {
            token
        }
    }
}