import {IAuthRepository} from "../../../interfaces/IAuthRepository";
import {inject, singleton} from "tsyringe";
import {NotFoundError} from "../../../domain/errors/NotFoundError";
import {DeleteUserCommand} from "./DeleteUserCommand";

@singleton()
export default class DeleteUserCommandHandler {

    public constructor(
        @inject("authRepository") private _authRepository: IAuthRepository,
    ) {}

    public async execute(request: DeleteUserCommand): Promise<void> {

        console.log(request.token)

        const foundUser = await this._authRepository.getAuthUserById(request.id)

        if (!foundUser) {
            throw new NotFoundError()
        }

        try {
            await this._authRepository.deleteUser(request.id)
        } catch (error) {
            throw error
        }
    }
}