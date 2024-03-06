import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "../../../common/persistance/IAuthRepository";
import {ITokenService} from "../../../common/security/ITokenService";
import IAuthenticationRequest from "../../../../contracts/authentication/IAuthenticationRequest";
import {ICryptoService} from "../../../common/security/ICryptoService";
import {AuthUser} from "../../../../domain/authentication/AuthUser";
import {AuthErrors} from "../../../../domain/errors/AuthErrors";
import {AuthMapper} from "../../../common/mapper/AuthMapper";


@singleton()
export default class LoginQueryHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
        @inject("tokenService") private tokenService: ITokenService,
        @inject("cryptoService") private cryptoService: ICryptoService
    ) {}

    public async getLoginToken(request: IAuthenticationRequest): Promise<any> {

        const foundUser = await this.authRepository.getAuthUserByEmail(request.email)

        let isCorrectPassword = false;

        if (foundUser) {
            isCorrectPassword = await this.cryptoService.handleCompare(request.password, foundUser.password)
        }

        if (!foundUser || !isCorrectPassword) {
            throw AuthErrors.InvalidCredentials()
        }

        const user = AuthUser.create(
            foundUser._id.toString(),
            foundUser.email,
            request.password
        )

        try {
            const token = this.tokenService.generateToken(user.id.value, user)

            return AuthMapper.toResponse(user, token)

        } catch (error) {
            throw error
        }
    }
}