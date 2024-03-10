import {IDatabase} from "../interfaces";
import {MongoDbDatabase} from "./mongo-db/MongoDbDatabase";
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