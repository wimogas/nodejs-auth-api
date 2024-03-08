import {BaseError} from "../../../common/domain/models/Errors/BaseError";

export class MissingPasswordError extends BaseError {
    constructor(message?: string) {
        super(404, message ? message : "Password is required");
    }
}