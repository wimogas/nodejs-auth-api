import {inject, singleton} from "tsyringe";
import {IUserRepository} from "../../../interfaces/IUserRepository";
import {ICryptoService} from "../../../interfaces/ICryptoService";
import {ITokenService} from "../../../interfaces/ITokenService";
import {GetTokenQuery} from "./GetTokenQuery";
import {UnauthorizedError} from "../../../domain/errors/UnauthorizedError";

@singleton()
export default class GetTokenQueryHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        @inject("cryptoService") private _cryptoService: ICryptoService,
        @inject("tokenService") private _tokenService: ITokenService
    ) {}

    public async execute(request: GetTokenQuery): Promise<string> {

        const foundUser = await this._userRepository.getUserByEmail(request.email)

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