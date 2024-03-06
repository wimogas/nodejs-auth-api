import {ValueObject} from "../../models/ValueObject";

export class AuthUserId extends ValueObject {
    public value: any;
    private constructor(value: any) {
        super();
        this.value = value;
    }
    public static create(value: any): AuthUserId {
        return new AuthUserId(value)
    }
}