import {IHTTPRequest} from "../../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";

export default interface IValidator {
    validate(request: IHTTPRequest): any;
}