import {inject, singleton} from "tsyringe";
import {IAuthRepository} from "../../../interfaces/IAuthRepository";
import {Permission} from "../../../domain/auth/Permission";
import {Role} from "../../../domain/auth/Role";

@singleton()
export class SeedAuthCommandHandler {

    public constructor(
        @inject("authRepository") private _authRepository: IAuthRepository,
    ) {}

    public async execute(request: any): Promise<void> {
        console.log("execute seedAuth")
        try {

            if (request.permissions && request.permissions.length > 0) {
                request.permissions.map((permission: any) => {
                    const newPermission = Permission.create({
                        name: permission.name
                    })
                    console.log(newPermission)
                    this._authRepository.seedPermission(newPermission)
                })
            }

            if (request.roles && request.roles.length > 0) {
                request.roles.map((role: any) => {
                    const newRole = Role.create({
                        name: role.name
                    })
                    this._authRepository.seedRole(newRole)
                })
            }
        } catch (error) {
            throw error
        }
    }
}