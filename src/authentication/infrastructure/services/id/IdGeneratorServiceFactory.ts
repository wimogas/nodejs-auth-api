import {MongoDbIdGeneratorService} from "./MongoDbIdGeneratorService";
import {DefaultIdGeneratorService} from "./DefaultIdGeneratorService";

export class IdGeneratorServiceFactory {
    static createIdGeneratorService(type: string): any {
        if (type === 'MONGODB') {
            return MongoDbIdGeneratorService;
        } else {
            return DefaultIdGeneratorService;
        }
    }
}