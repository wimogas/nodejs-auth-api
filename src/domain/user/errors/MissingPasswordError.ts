import {BaseError} from "../../common/errors/BaseError";

export class MissingPasswordError extends BaseError {
    constructor(message?: string) {
        super(404, message ? message : "Password is required");
    }
}