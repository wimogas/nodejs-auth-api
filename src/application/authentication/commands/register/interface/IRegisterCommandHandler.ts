import {IRegisterRequest} from "../../../../../contracts/authentication/IRegisterRequest";


export default interface IRegisterCommandHandler {
    register(request: IRegisterRequest): Promise<void>
}