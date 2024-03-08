import {BaseError} from "../../errors/BaseError";

export class MissingEmailError extends BaseError {
    constructor(message?: string) {
        super(404, message ? message : "Email is required");
    }
}