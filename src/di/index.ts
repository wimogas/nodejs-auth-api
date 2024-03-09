import {container} from "tsyringe";
import {BcryptCryptoService} from "../services/BcryptCryptoService";
import {UserRepository} from "../features/user/UserRepository";
import {IdGeneratorService} from "../services/IdGeneratorService";
import {JwtTokenProvider} from "../services/JwtTokenProvider";

container.registerSingleton("userRepository", UserRepository);
container.registerSingleton("idGenerator", IdGeneratorService)
container.registerSingleton("cryptoService", BcryptCryptoService)
container.registerSingleton("tokenProvider", JwtTokenProvider)


export default container;