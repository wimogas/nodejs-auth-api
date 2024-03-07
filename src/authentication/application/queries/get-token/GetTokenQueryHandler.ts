import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "../../common/interfaces/IAuthRepository";
import {ITokenService} from "../../common/interfaces/ITokenService";
import {ICryptoService} from "../../common/interfaces/ICryptoService";
import IAuthenticationResponse from "../../../contracts/IAuthenticationResponse";
import {Error} from "../../../domain/errors/Error";

@singleton()
export default class GetTokenQueryHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
        @inject("tokenService") private tokenService: ITokenService,
        @inject("cryptoService") private cryptoService: ICryptoService
    ) {}

    public async execute(request: any): Promise<IAuthenticationResponse> {

        const foundUser = await this.authRepository.getAuthUserByEmail(request.email)

        if (!foundUser || !await this.cryptoService.handleCompare(request.password, foundUser.password)) {
            throw Error.Unauthorized()
        }

        const mappedUser = {
            id: foundUser._id,
            email: foundUser.email,
            permissions: foundUser.permissions,
            roles: foundUser.roles
        }

        try {
            const token = this.tokenService.generateToken(mappedUser)
            return {
                token
            }

        } catch (error) {
            throw error
        }
    }
}