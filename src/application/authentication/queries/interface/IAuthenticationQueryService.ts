import {ILoginRequest} from "../../../../contracts/authentication/ILoginRequest";

export default interface IAuthenticationQueryService {
    getLoginTokenQuery(request: ILoginRequest): Promise<void>
}