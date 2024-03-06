import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "../../common/interfaces/IAuthRepository";
import {ITokenService} from "../../common/interfaces/ITokenService";
import IAuthenticationRequest from "../../../contracts/IAuthenticationRequest";
import {ICryptoService} from "../../common/interfaces/ICryptoService";
import {AuthUser} from "../../../domain/AuthUser";
import {AuthErrors} from "../../../domain/errors/AuthErrors";
import {AuthMapper} from "../../common/mapper/AuthMapper";


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

        try {
            const token = this.tokenService.generateToken(foundUser.id.value, foundUser)

            return AuthMapper.toResponse(foundUser, token)

        } catch (error) {
            throw error
        }
    }
}