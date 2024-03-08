import {IDatabase} from "../interfaces/IDatabase";
import {MongoDbDatabase} from "./MongoDbDatabase";
import {InMemoryDatabase} from "./InMemoryDatabase";

export class DatabaseFactory {
    static createDatabase(provider: string): IDatabase {
        if (provider === 'MONGODB') {
            return new MongoDbDatabase();
        } else {
            return new InMemoryDatabase()
        }
    }
}