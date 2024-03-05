import {inject, injectable, singleton} from "tsyringe";
import {IAuthRepository} from "../../../common/interfaces/persistance/IAuthRepository";
import {ITokenService} from "../../../common/interfaces/security/ITokenService";
import ILoginRequest from "../../../../contracts/authentication/ILoginRequest";
import {ICryptoService} from "../../../common/interfaces/security/ICryptoService";
import User from "../../../../domain/entities/User";
import {AuthErrors} from "../../../../domain/errors/AuthErrors";


@singleton()
export default class LoginQueryHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
        @inject("tokenService") private tokenService: ITokenService,
        @inject("cryptoService") private cryptoService: ICryptoService
    ) {}

    public async getLoginToken(request: ILoginRequest): Promise<any> {

        const foundUser = await this.authRepository.getUserByEmail(request.email)

        let isCorrectPassword = false;

        if (foundUser) {
            isCorrectPassword = await this.cryptoService.handleCompare(request.password, foundUser.password)
        }

        if (!foundUser || !isCorrectPassword) {
            throw AuthErrors.InvalidCredentials()
        }

        const user = User.create({
            name: foundUser.name,
            email: foundUser.email,
            password: request.password
        }, foundUser._id.toString())

        try {
            const token = this.tokenService.generateToken(user.id, user)

            return {
                id: user.id,
                name: user.getName,
                email: user.getEmail,
                token: token
            }

        } catch (error) {
            throw error
        }
    }
}