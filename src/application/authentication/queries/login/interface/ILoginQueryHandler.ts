import IAuthenticationRequest from "../../../../../contracts/authentication/IAuthenticationRequest";

export default interface ILoginQueryHandler {
    getLoginToken(request: IAuthenticationRequest): Promise<any>
}