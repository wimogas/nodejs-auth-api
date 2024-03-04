import {IDatabase} from "../interface/IDatabase";

export class InMemoryDatabase implements IDatabase {
    public async connect() {
        await Promise.resolve()
        console.log('Connected to In-Memory Database')
    }
}