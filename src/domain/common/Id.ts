import {ValueObject} from "./ValueObject";
import {IIdGeneratorService} from "../../infrastructure/services/id-generator/IIdGeneratorService";
import {IdGeneratorService} from "../../infrastructure/services";


export class Id extends ValueObject {
    public value: any;
    static _idGenerator: IIdGeneratorService = new IdGeneratorService()

    public constructor(value: any) {
        super();
        this.value = value;
    }

    public static create(value?: any): Id {
        value = this._idGenerator.verifyId(value) ? value : this._idGenerator.generateId()
        return new Id(value)
    }
}