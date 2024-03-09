import {ValueObject} from "./ValueObject";
import {IdGeneratorService} from "../../services/IdGeneratorService";
import {IIdGeneratorService} from "../../interfaces";


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