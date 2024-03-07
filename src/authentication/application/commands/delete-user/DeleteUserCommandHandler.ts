import {IAuthRepository} from "../../common/interfaces/IAuthRepository";
import {inject, singleton} from "tsyringe";
import IDeleteUserRequest from "../../../contracts/IDeleteUserRequest";
import {Errors} from "../../../domain/errors/Errors";

@singleton()
export default class DeleteUserCommandHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
    ) {}

    public async execute(id: string): Promise<any> {

        const foundUser = await this.authRepository.getAuthUserById(id)

        if (!foundUser) {
            throw Errors.NotFound()
        }

        try {
            await this.authRepository.deleteUser(id)

        } catch (error) {
            throw error
        }
    }
}