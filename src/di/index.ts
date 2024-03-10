import {container} from "tsyringe";
import {MongoDbUserRepository} from "../database/mongo-db/user/MongoDbUserRepository";
import {MongoDbRoleRepository} from "../database/mongo-db/role/MongoDbRoleRepository";
import {MongoDbPermissionRepository} from "../database/mongo-db/permission/MongoDbPermissionRepository";
import {BcryptCryptoService} from "../services/BcryptCryptoService";
import {IdGeneratorService} from "../services/IdGeneratorService";
import {JwtTokenProvider} from "../services/JwtTokenProvider";

container.registerSingleton("userRepository", MongoDbUserRepository);
container.registerSingleton("roleRepository", MongoDbRoleRepository);
container.registerSingleton("permissionRepository", MongoDbPermissionRepository);

container.registerSingleton("idGenerator", IdGeneratorService)
container.registerSingleton("cryptoService", BcryptCryptoService)
container.registerSingleton("tokenProvider", JwtTokenProvider)


export default container;