import {container} from "tsyringe";
import {AuthRepositoryFactory} from "../database/AuthRepositoryFactory";
import {IdGeneratorServiceFactory} from "../services/id/IdGeneratorServiceFactory";
import {BcryptCryptoService} from "../../domain/crypto-service/BcryptCryptoService";
import {TokenServiceFactory} from "../services/token/TokenServiceFactory";

container.registerSingleton("authRepository", AuthRepositoryFactory.createAuthRepository(process.env.DB_PROVIDER));
container.registerSingleton("idGenerator", IdGeneratorServiceFactory.createIdGeneratorService(process.env.ID_PROVIDER))
container.registerSingleton("cryptoService", BcryptCryptoService)
container.registerSingleton("tokenService", TokenServiceFactory.createTokenService(process.env.TOKEN_PROVIDER))


export default container;