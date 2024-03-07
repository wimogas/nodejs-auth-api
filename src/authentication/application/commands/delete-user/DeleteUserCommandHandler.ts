import {IAuthRepository} from "../../common/interfaces/IAuthRepository";
import {inject, singleton} from "tsyringe";
import {Error} from "../../../domain/errors/Error";

@singleton()
export default class DeleteUserCommandHandler {

    public constructor(
        @inject("authRepository") private authRepository: IAuthRepository,
    ) {}

    public async execute(id: string): Promise<void> {

        const foundUser = await this.authRepository.getAuthUserById(id)

        if (!foundUser) {
            throw Error.NotFound()
        }

        try {
            await this.authRepository.deleteUser(id)
        } catch (error) {
            throw error
        }
    }
}