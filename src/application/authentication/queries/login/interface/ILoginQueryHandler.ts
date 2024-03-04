import {ILoginRequest} from "../../../../../contracts/authentication/ILoginRequest";

export default interface ILoginQueryHandler {
    getLoginToken(request: ILoginRequest): Promise<void>
}