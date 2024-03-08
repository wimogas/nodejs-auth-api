import {InvalidEmailError} from "../errors/InvalidEmailError";
import {MissingEmailError} from "../errors/MissingEmailError";
import {ValueObject} from "../../ValueObject";

export class Email extends ValueObject {
    public value: string
    private static validRegex : RegExp = new RegExp('^[\\w-]+@([\\w-]+\\.)+[\\w-]{2,4}$')

    public constructor(value: any) {
        super();
        this.value = value
    }

    public static create(value: any): Email {
        this.validate(value)
        return new Email(value)
    }

    public static validate(value: any): void {
        if(!value) {
            throw new MissingEmailError()
        }
        if(!this.validRegex.test(value)) {
            throw new InvalidEmailError()
        }
    }
}