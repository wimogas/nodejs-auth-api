import {MongoDbIdGeneratorService} from "./MongoDbIdGeneratorService";

export class IdGeneratorServiceFactory {
    static createIdGeneratorService(type: string): any {
        if (type === 'MONGODB') {
            return MongoDbIdGeneratorService;
        }
    }
}