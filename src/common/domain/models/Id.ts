import {ValueObject} from "./ValueObject";
import {randomUUID} from "crypto";

export class Id extends ValueObject {
    public value: any;
    public constructor(value: any) {
        super();
        this.value = value;
    }
    public static create(value?: any): Id {
        value = value ? value : randomUUID()
        return new Id(value)
    }
}