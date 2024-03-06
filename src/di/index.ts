import {container} from "tsyringe";
import {AuthRepositoryFactory} from "../authentication/infrastructure/database/AuthRepositoryFactory";
import {TokenServiceFactory} from "../authentication/infrastructure/security/token/TokenServiceFactory";
import {CryptoServiceFactory} from "../authentication/infrastructure/security/crypto/CryptoServiceFactory";
import {IdGeneratorServiceFactory} from "../authentication/infrastructure/services/id/IdGeneratorServiceFactory";

container.registerSingleton("authRepository", AuthRepositoryFactory.createAuthRepository(process.env.DB_PROVIDER));
container.registerSingleton("tokenService", TokenServiceFactory.createTokenService(process.env.TOKEN_PROVIDER));
container.registerSingleton("cryptoService", CryptoServiceFactory.createCryptoService(process.env.CRYPTO_PROVIDER));
container.registerSingleton("idGenerator", IdGeneratorServiceFactory.createIdGeneratorService(process.env.DB_PROVIDER));

export default container;