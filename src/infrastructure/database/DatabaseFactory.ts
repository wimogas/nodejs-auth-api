import {IDatabase} from "./interface/IDatabase";
import {MongoDbDatabase} from "./mongodb/MongoDbDatabase";
import {InMemoryDatabase} from "./in-memory/InMemoryDatabase";

export class DatabaseFactory {
    static createDatabase(provider: string): IDatabase {
        if (provider === 'MONGODB') {
            return new MongoDbDatabase();
        } else {
            return new InMemoryDatabase()
        }
    }
}