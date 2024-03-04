import {IRegisterRequest} from "../../../../../contracts/authentication/IRegisterRequest";


export default interface IRegisterCommandService {
    register(request: IRegisterRequest): Promise<void>
}