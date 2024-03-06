import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "../../../common/interfaces/persistance/IAuthRepository";
import {ITokenService} from "../../../common/interfaces/security/ITokenService";
import IAuthenticationRequest from "../../../../contracts/authentication/IAuthenticationRequest";
import {ICryptoService} from "../../../common/interfaces/security/ICryptoService";
import {AuthUser} from "../../../../domain/authentication/AuthUser";
import {AuthErrors} from "../../../../domain/errors/AuthErrors";


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

            return {
                id: user.id.value,
                email: user.email,
                token: token
            }

        } catch (error) {
            throw error
        }
    }
}