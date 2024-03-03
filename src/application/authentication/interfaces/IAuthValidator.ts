import {IHTTPRequest} from "../../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";

export default interface IAuthValidator {
    validate(request: IHTTPRequest): any;
}