import {IHTTPRequest} from "./";

export interface IController {
    execute(request: IHTTPRequest): Promise<any>
}