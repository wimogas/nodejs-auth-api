import {container} from "tsyringe";
import {AuthRepositoryFactory} from "../database/AuthRepositoryFactory";
import {TokenServiceFactory} from "../services/token/TokenServiceFactory";
import {CryptoServiceFactory} from "../services/crypto/CryptoServiceFactory";
import {IdGeneratorServiceFactory} from "../services/id/IdGeneratorServiceFactory";
import {CurrentUserProvider} from "../security/current-user/CurrentUserProvider";
import {AuthorizationService} from "../security/AuthorizationService";
import {PolicyService} from "../security/policy/PolicyService";

container.registerSingleton("authRepository", AuthRepositoryFactory.createAuthRepository(process.env.DB_PROVIDER));
container.registerSingleton("tokenService", TokenServiceFactory.createTokenService(process.env.TOKEN_PROVIDER));
container.registerSingleton("cryptoService", CryptoServiceFactory.createCryptoService(process.env.CRYPTO_PROVIDER));
container.registerSingleton("idGenerator", IdGeneratorServiceFactory.createIdGeneratorService(process.env.DB_PROVIDER));
container.registerSingleton("currentUserProvider", CurrentUserProvider);
container.registerSingleton("policyService", PolicyService);
container.registerSingleton("authorizationService", AuthorizationService);

export default container;