import {IAuthRepository} from "./common/interfaces/IAuthRepository";
import {inject, singleton} from "tsyringe";
import {NotFoundError} from "../../common/domain/models/Errors/NotFoundError";

@singleton()
export default class DeleteUserCommandHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
    ) {}

    public async execute(request: any): Promise<void> {

        const foundUser = await this.authRepository.getAuthUserById(request.id)

        if (!foundUser) {
            throw new NotFoundError()
        }

        try {
            await this.authRepository.deleteUser(request.id)
        } catch (error) {
            throw error
        }
    }
}