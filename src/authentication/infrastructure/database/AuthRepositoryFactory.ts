import {InMemoryAuthRepository} from "./in-memory/InMemoryAuthRepository";
import {MongoDbAuthRepository} from "./mongodb/MongoDbAuthRepository";

export class AuthRepositoryFactory {
    static createAuthRepository(provider: string): any {
        if (provider === 'MONGODB') {
            return MongoDbAuthRepository;
        } else {
            return InMemoryAuthRepository
        }
    }
}