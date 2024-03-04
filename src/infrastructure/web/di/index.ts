import {AuthRepositoryFactory} from "../../database/AuthRepositoryFactory";
import {CryptoServiceFactory} from "../../security/crypto/CryptoServiceFactory";
import {TokenServiceFactory} from "../../security/token/TokenServiceFactory";
import {IdGeneratorServiceFactory} from "../../services/id/IdGeneratorServiceFactory";

const awilix = require('awilix');

const AuthRepository = AuthRepositoryFactory.createAuthRepository(process.env.DB_PROVIDER)
const CryptoService = CryptoServiceFactory.createCryptoService(process.env.CRYPTO_PROVIDER)
const TokenService = TokenServiceFactory.createTokenService(process.env.TOKEN_PROVIDER)
const IdGenerator = IdGeneratorServiceFactory.createIdGeneratorService(process.env.DB_PROVIDER)

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true
})

container.register({
    authRepository: awilix.asClass(AuthRepository).singleton(),
    tokenService: awilix.asClass(TokenService).singleton(),
    cryptoService: awilix.asClass(CryptoService).singleton(),
    idGenerator: awilix.asClass(IdGenerator).singleton()
})

export default container;