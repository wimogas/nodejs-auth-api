import {MongoDbAuthRepository} from "./mongodb/authentication/MongoDbAuthRepository";
import {IAuthRepository} from "../../application/common/interfaces/persistance/IAuthRepository";

export class AuthRepositoryFactory {
    static createAuthRepository(type: string): IAuthRepository {
        if (type === 'MONGODB') {
            return new MongoDbAuthRepository();
        }
    }
}