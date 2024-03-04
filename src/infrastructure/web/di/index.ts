import {JwtTokenService} from "../../security/token/JwtTokenService";
import {BcryptCryptoService} from "../../security/crypto/BcryptCryptoService";
import {MongoDbIdGeneratorService} from "../../services/id/MongoDbIdGeneratorService";
import {AuthRepositoryFactory} from "../../database/AuthRepositoryFactory";

const awilix = require('awilix');

const AuthRepository = AuthRepositoryFactory.createAuthRepository(process.env.DB_PROVIDER)

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true
})

container.register({
    authRepository: awilix.asClass(AuthRepository).singleton(),
    tokenService: awilix.asClass(JwtTokenService).singleton(),
    cryptoService: awilix.asClass(BcryptCryptoService).singleton(),
    idGenerator: awilix.asClass(MongoDbIdGeneratorService).singleton()
})

export default container;