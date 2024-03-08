import {BaseError} from "../../../domain/errors/BaseError";

export class MissingEmailError extends BaseError {
    constructor(message?: string) {
        super(404, message ? message : "Email is required");
    }
}