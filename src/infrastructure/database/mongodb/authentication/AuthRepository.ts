import {IAuthRepository} from "../../../../application/authentication/repositories/IAuthRepository";
import User from "../../../../domain/User";

export class AuthRepository implements IAuthRepository {
    public async addUser(user: User): Promise<User> {
        // Persist User

        // Map Model Result to Domain Entity

        // Return Domain Entity
        return
    }

}