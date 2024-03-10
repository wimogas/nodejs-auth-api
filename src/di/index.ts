import {container} from "tsyringe";
import {MongoDbUserRepository} from "../database/mongo-db/user/MongoDbUserRepository";
import {MongoDbAuthRepository} from "../database/mongo-db/auth/MongoDbAuthRepository";
import {BcryptCryptoService} from "../services/BcryptCryptoService";
import {IdGeneratorService} from "../services/IdGeneratorService";
import {JwtTokenProvider} from "../services/JwtTokenProvider";

container.registerSingleton("userRepository", MongoDbUserRepository);
container.registerSingleton("authRepository", MongoDbAuthRepository);

container.registerSingleton("idGenerator", IdGeneratorService)
container.registerSingleton("cryptoService", BcryptCryptoService)
container.registerSingleton("tokenProvider", JwtTokenProvider)


export default container;