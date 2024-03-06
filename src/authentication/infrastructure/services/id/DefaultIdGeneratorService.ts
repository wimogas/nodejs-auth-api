import {randomUUID} from "crypto";
import {IIdGeneratorService} from "../../../application/common/interfaces/IIdGeneratorService";

export class DefaultIdGeneratorService implements IIdGeneratorService{
    public generateId() {
        return randomUUID().toString()
    }
}