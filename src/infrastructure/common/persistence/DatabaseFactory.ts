import {IDatabase} from "../../../application/interfaces";
import {MongoDbDatabase} from "./MongoDbDatabase";

export class DatabaseFactory {
    static createDatabase(provider: string): IDatabase {
        if (provider === 'MONGODB') {
            return new MongoDbDatabase();
        }
    }
}