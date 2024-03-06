import IAuthenticationRequest from "../../../../../contracts/IAuthenticationRequest";


export default interface IRegisterCommandHandler {
    register(request: IAuthenticationRequest): Promise<any>
}