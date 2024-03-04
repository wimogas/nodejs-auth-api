import {MongoDbAuthRepository} from "../../database/mongodb/authentication/MongoDbAuthRepository";
import {JwtTokenService} from "../../security/token/JwtTokenService";
import {BcryptCryptoService} from "../../security/crypto/BcryptCryptoService";
import {MongoDbIdGeneratorService} from "../../services/id/MongoDbIdGeneratorService";

const awilix = require('awilix');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true
})

container.register({
    authRepository: awilix.asClass(MongoDbAuthRepository).scoped(),
    tokenService: awilix.asClass(JwtTokenService).scoped(),
    cryptoService: awilix.asClass(BcryptCryptoService).scoped(),
    idGenerator: awilix.asClass(MongoDbIdGeneratorService).scoped()
})

export default container;