import mongoose from 'mongoose'
import {IDatabase} from "../interface/IDatabase";

export class MongoDbDatabase implements IDatabase {
    public async connect() {
        mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log('Connected to MongoDB')
        }).catch(console.error)
    }

    public async close(): Promise<void> {
        await mongoose.connection.close()
    }
}