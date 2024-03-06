import {AuthUser} from "../../../../domain/authentication/AuthUser";
import {IAuthRepository} from "../../../common/persistance/IAuthRepository";
import {ITokenService} from "../../../common/security/ITokenService";
import {ICryptoService} from "../../../common/security/ICryptoService";
import {IIdGeneratorService} from "../../../common/services/IIdGeneratorService";
import {AuthErrors} from "../../../../domain/errors/AuthErrors";
import {inject, singleton} from "tsyringe";
import IAuthenticationRequest from "../../../../contracts/IAuthenticationRequest";
import {AuthMapper} from "../../../common/mapper/AuthMapper";

@singleton()
export default class RegisterCommandHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
        @inject("tokenService") private tokenService: ITokenService,
        @inject("cryptoService") private cryptoService: ICryptoService,
        @inject("idGenerator") private idGenerator: IIdGeneratorService
    ) {}

    public async register(request: IAuthenticationRequest): Promise<any> {

        const foundUser = await this.authRepository.getAuthUserByEmail(request.email)

        if (foundUser) {
            throw AuthErrors.DuplicateEmail()
        }

        const hashedPassword = await this.cryptoService.handleHash(request.password, 10)

        const id = this.idGenerator.generateId()

        const newUser = AuthUser.create(
            id,
            request.email,
            hashedPassword
        )

        try {
            await this.authRepository.addAuthUser(newUser)

            const token = this.tokenService.generateToken(newUser.id.value, newUser)

            return AuthMapper.toResponse(newUser, token)

        } catch (error) {
            throw error
        }
    }
}