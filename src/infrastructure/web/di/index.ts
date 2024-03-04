import {LoginQueryValidator} from "../../../application/authentication/queries/login/LoginQueryValidator";
import {MongoDbAuthRepository} from "../../database/mongodb/authentication/MongoDbAuthRepository";
import {JwtTokenService} from "../../security/token/JwtTokenService";
import {BcryptCryptoService} from "../../security/crypto/BcryptCryptoService";
import {MongoDbIdGeneratorService} from "../../services/id/MongoDbIdGeneratorService";
import {RegisterCommandValidator} from "../../../application/authentication/commands/register/RegisterCommandValidator";

const awilix = require('awilix');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true
})

container.register({
    authRepository: awilix.asClass(MongoDbAuthRepository).scoped(),
    tokenService: awilix.asClass(JwtTokenService).scoped(),
    crypto: awilix.asClass(BcryptCryptoService).scoped(),
    idGenerator: awilix.asClass(MongoDbIdGeneratorService).scoped(),
    loginValidator: awilix.asClass(LoginQueryValidator).scoped(),
    registerValidator: awilix.asClass(RegisterCommandValidator).scoped()
})

export default container;