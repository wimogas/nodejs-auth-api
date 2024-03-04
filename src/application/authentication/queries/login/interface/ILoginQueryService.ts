import {ILoginRequest} from "../../../../../contracts/authentication/ILoginRequest";

export default interface ILoginQueryService {
    getLoginTokenQuery(request: ILoginRequest): Promise<void>
}