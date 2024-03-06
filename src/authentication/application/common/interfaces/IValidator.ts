import {IHTTPRequest} from "./IHTTPRequest";

export default interface IValidator {
    validate(request: IHTTPRequest): any;
}