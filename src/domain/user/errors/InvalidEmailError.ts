import {BaseError} from "../../common/errors/BaseError";

export class InvalidEmailError extends BaseError {
    constructor(message?: string) {
        super(400, message ? message : "Email is not valid");
    }
}