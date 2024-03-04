import {randomUUID} from "crypto";
import {IIdGeneratorService} from "../../../application/common/interfaces/persistance/IIdGeneratorService";

export class DefaultIdGeneratorService implements IIdGeneratorService{
    public generateId() {
        return randomUUID().toString()
    }
}