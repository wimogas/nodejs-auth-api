import {IRegisterRequest} from "../../../../contracts/authentication/IRegisterRequest";


export default interface IAuthenticationCommandService {
    register(request: IRegisterRequest): Promise<void>
}