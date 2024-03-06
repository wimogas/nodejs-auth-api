import {ValueObject} from "../../models/ValueObject";

export class UserId extends ValueObject {
    public value: any;
    private constructor(value: any) {
        super();
        this.value = value;
    }
    public static create(value: any): UserId {
        return new UserId(value)
    }
}