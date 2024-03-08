import {BaseError} from "../../../domain/errors/BaseError";

export class InvalidPasswordError extends BaseError {
    constructor(message?: string) {
        super(400, message ? message : "Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol");
    }
}