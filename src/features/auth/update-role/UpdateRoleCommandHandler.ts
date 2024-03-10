import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "../../../interfaces/IAuthRepository";
import {Permission} from "../../../domain/auth/Permission";
import {Role} from "../../../domain/auth/Role";

@singleton()
export class UpdateRoleCommandHandler {

    public constructor(
        @inject("authRepository") private _authRepository: IAuthRepository,
    ) {}

    public async execute(request: any): Promise<void> {
        console.log(`execute UpdateRoleCommandHandler ${request}`)

        try {

            await this._authRepository.addPermissionToRole(request.id, request.permission)

        } catch (error) {
            throw error
        }
    }
}