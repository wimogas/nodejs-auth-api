import {IHTTPRequest} from "../../../../../common/http/interfaces/IHTTPRequest";

export default interface IValidator {
    validate(request: IHTTPRequest): any;
}