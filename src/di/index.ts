import {container} from "tsyringe";
import {BcryptCryptoService} from "../services/BcryptCryptoService";
import {UserRepository} from "../features/user/UserRepository";
import {IdGeneratorService} from "../services/IdGeneratorService";
import {JwtTokenService} from "../services/JwtTokenService";

container.registerSingleton("userRepository", UserRepository);
container.registerSingleton("idGenerator", IdGeneratorService)
container.registerSingleton("cryptoService", BcryptCryptoService)
container.registerSingleton("tokenService", JwtTokenService)


export default container;