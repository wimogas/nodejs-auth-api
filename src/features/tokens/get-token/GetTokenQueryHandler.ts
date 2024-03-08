import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "../../../interfaces/IAuthRepository";
import {UnauthorizedError} from "../../../domain/errors/UnauthorizedError";
import {ICryptoService} from "../../../services/crypto-service/ICryptoService";
import {ITokenService} from "../../../interfaces/ITokenService";
import {GetTokenQuery} from "./GetTokenQuery";

@singleton()
export default class GetTokenQueryHandler {

    public constructor(
        @inject("authRepository") private _authRepository: IAuthRepository,
        @inject("cryptoService") private _cryptoService: ICryptoService,
        @inject("tokenService") private _tokenService: ITokenService
    ) {}

    public async execute(request: GetTokenQuery): Promise<string> {

        const foundUser = await this._authRepository.getAuthUserByEmail(request.email)

        const isCorrectPassword = await this._cryptoService.handleCompare(request.password, foundUser.password)

        if (!foundUser || !isCorrectPassword) {
            throw new UnauthorizedError()
        }

        try {
            return this._tokenService.generateToken({
                id: foundUser._id,
                email: foundUser.email
            })
        } catch (error) {
            throw error
        }
    }
}