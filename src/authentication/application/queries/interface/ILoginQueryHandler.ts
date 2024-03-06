import IAuthenticationRequest from "../../../contracts/IAuthenticationRequest";

export default interface ILoginQueryHandler {
    getLoginToken(request: IAuthenticationRequest): Promise<any>
}