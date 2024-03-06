import IAuthenticationRequest from "../../../../../contracts/authentication/IAuthenticationRequest";


export default interface IRegisterCommandHandler {
    register(request: IAuthenticationRequest): Promise<any>
}