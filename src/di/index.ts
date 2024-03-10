import {container} from "tsyringe";
import {IdGeneratorService} from "../infrastructure/services";
import {BcryptCryptoService, JwtTokenProvider} from "../infrastructure/security";
import {UserRepository} from "../infrastructure/users/persistence";
import {RoleRepository} from "../infrastructure/roles/persistence";
import {PermissionRepository} from "../infrastructure/permissions/persistence";

container.registerSingleton("userRepository", UserRepository);
container.registerSingleton("roleRepository", RoleRepository);
container.registerSingleton("permissionRepository", PermissionRepository);

container.registerSingleton("idGenerator", IdGeneratorService)
container.registerSingleton("cryptoService", BcryptCryptoService)
container.registerSingleton("tokenProvider", JwtTokenProvider)


export default container;