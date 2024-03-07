import {ICurrentUser} from "./ICurrentUser";
import {IHTTPRequest} from "../../../application/common/interfaces/IHTTPRequest";

export interface ICurrentUserProvider {
    getCurrentUser(request: IHTTPRequest): ICurrentUser
}