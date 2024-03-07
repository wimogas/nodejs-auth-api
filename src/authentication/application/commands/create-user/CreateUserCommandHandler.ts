import {AuthUser} from "../../../domain/AuthUser";
import {IAuthRepository} from "../../common/interfaces/IAuthRepository";
import {ITokenService} from "../../common/interfaces/ITokenService";
import {ICryptoService} from "../../common/interfaces/ICryptoService";
import {IIdGeneratorService} from "../../common/interfaces/IIdGeneratorService";
import {AuthErrors} from "../../../domain/errors/AuthErrors";
import {inject, singleton} from "tsyringe";
import IAuthenticationRequest from "../../../contracts/IAuthenticationRequest";
import {AuthMapper} from "../../common/mapper/AuthMapper";

@singleton()
export default class CreateUserCommandHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
        @inject("tokenService") private tokenService: ITokenService,
        @inject("cryptoService") private cryptoService: ICryptoService,
        @inject("idGenerator") private idGenerator: IIdGeneratorService
    ) {}

    public async execute(request: IAuthenticationRequest): Promise<any> {

        const foundUser = await this.authRepository.getAuthUserByEmail(request.email)

        if (foundUser) {
            throw AuthErrors.DuplicateEmail()
        }

        const hashedPassword = await this.cryptoService.handleHash(request.password, 10)

        const id = this.idGenerator.generateId()

        const newUser = AuthUser.create(
            id,
            request.email,
            hashedPassword,
            request.permissions,
            request.roles
        )

        try {
            await this.authRepository.addAuthUser(newUser)

            const token = this.tokenService.generateToken(newUser)

            return AuthMapper.toResponse(token)

        } catch (error) {
            throw error
        }
    }
}