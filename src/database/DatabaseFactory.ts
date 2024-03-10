import {MongoDbDatabase} from "./mongo-db/MongoDbDatabase";
import {InMemoryDatabase} from "./in-memory/InMemoryDatabase";
import {IDatabase} from "./interfaces/IDatabase";

export class DatabaseFactory {
    static createDatabase(provider: string): IDatabase {
        if (provider === 'MONGODB') {
            return new MongoDbDatabase();
        } else {
            return new InMemoryDatabase()
        }
    }
}