import {MongoDbAuthRepository} from "./mongodb/authentication/MongoDbAuthRepository";
import {InMemoryAuthRepository} from "./in-memory/authentication/InMemoryAuthRepository";

export class AuthRepositoryFactory {
    static createAuthRepository(provider: string): any {
        if (provider === 'MONGODB') {
            return MongoDbAuthRepository;
        } else {
            return InMemoryAuthRepository
        }
    }
}