import {MongoDbIdGeneratorService} from "./MongoDbIdGeneratorService";
import {IIdGeneratorService} from "../../../application/common/interfaces/services/IIdGeneratorService";
import {DefaultIdGeneratorService} from "./DefaultIdGeneratorService";

export class IdGeneratorServiceFactory {
    static createIdGeneratorService(type: string): IIdGeneratorService {
        if (type === 'MONGODB') {
            return new MongoDbIdGeneratorService();
        } else {
            return new DefaultIdGeneratorService();
        }
    }
}