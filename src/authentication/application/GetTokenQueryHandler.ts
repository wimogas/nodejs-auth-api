import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "./common/interfaces/IAuthRepository";
import IAuthenticationResponse from "../contracts/IAuthenticationResponse";
import IGetTokenRequest from "../contracts/IGetTokenRequest";
import {UnauthorizedError} from "../../common/domain/models/Errors/UnauthorizedError";
import {ICryptoService} from "../domain/crypto-service/ICryptoService";
import {ITokenService} from "./common/interfaces/ITokenService";

@singleton()
export default class GetTokenQueryHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
        @inject("cryptoService") private cryptoService: ICryptoService,
        @inject("tokenService") private tokenService: ITokenService
    ) {}

    public async execute(request: IGetTokenRequest): Promise<IAuthenticationResponse> {

        const foundUser = await this.authRepository.getAuthUserByEmail(request.email)

        const isCorrectPassword = await this.cryptoService.handleCompare(request.password, foundUser.password)

        if (!foundUser || !isCorrectPassword) {
            throw new UnauthorizedError()
        }

        const token = this.tokenService.generateToken({
            id: foundUser._id,
            email: foundUser.email
        })

        try {
            return {
                token
            }
        } catch (error) {
            throw error
        }
    }
}