import {randomUUID} from "crypto";
import {IIdGeneratorService} from "../../../application/common/services/IIdGeneratorService";

export class DefaultIdGeneratorService implements IIdGeneratorService{
    public generateId() {
        return randomUUID().toString()
    }
}