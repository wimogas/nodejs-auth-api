import {User} from "../../../../domain/authentication/User";
import {IAuthRepository} from "../../../common/interfaces/persistance/IAuthRepository";
import IRegisterRequest from "../../../../contracts/authentication/IRegisterRequest";
import {ITokenService} from "../../../common/interfaces/security/ITokenService";
import {ICryptoService} from "../../../common/interfaces/security/ICryptoService";
import {IIdGeneratorService} from "../../../common/interfaces/services/IIdGeneratorService";
import {AuthErrors} from "../../../../domain/errors/AuthErrors";
import {inject, singleton} from "tsyringe";

@singleton()
export default class RegisterCommandHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
        @inject("tokenService") private tokenService: ITokenService,
        @inject("cryptoService") private cryptoService: ICryptoService,
        @inject("idGenerator") private idGenerator: IIdGeneratorService
    ) {}

    public async register(request: IRegisterRequest): Promise<any> {

        const foundUser = await this.authRepository.getUserByEmail(request.email)

        if (foundUser) {
            throw AuthErrors.DuplicateEmail()
        }

        const hashedPassword = await this.cryptoService.handleHash(request.password, 10)

        const id = this.idGenerator.generateId()

        const newUser = User.create(
            id,
            request.name,
            request.email,
            hashedPassword
        )

        try {
            await this.authRepository.addUser(newUser)

            const token = this.tokenService.generateToken(newUser.id.value, newUser)

            return {
                id: newUser.id.value,
                name: newUser.name,
                email: newUser.email,
                token: token
            }

        } catch (error) {
            throw error
        }
    }
}