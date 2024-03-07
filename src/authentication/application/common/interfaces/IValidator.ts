import {IHTTPRequest} from "./IHTTPRequest";
import {Error} from "../../../domain/errors/Error";

export default interface IValidator {
    validate(request: IHTTPRequest): Error | null;
}