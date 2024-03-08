import {BaseError} from "../../../common/domain/models/Errors/BaseError";

export class MissingEmailError extends BaseError {
    constructor(message?: string) {
        super(404, message ? message : "Email is required");
    }
}