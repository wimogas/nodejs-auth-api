import {inject, singleton} from "tsyringe";
import {IPermissionRepository} from "../../../database/interfaces/IPermissionRepository";
import {CreatePermissionCommand} from "./CreatePermissionCommand";
import {ConflictError} from "../../../domain/common/errors";
import {Permission} from "../../../domain/permission/Permission";

@singleton()
export class CreatePermissionCommandHandler {

    public constructor(
        @inject("permissionRepository") private _permissionRepository: IPermissionRepository,
    ) {}

    public async execute(command: CreatePermissionCommand): Promise<void> {
        const foundPermission = await this._permissionRepository.getPermissionByName(command.name)

        if (foundPermission) {
            throw new ConflictError("Permission already exists.")
        }

        const permission = Permission.create({
            name: command.name
        })

        try {
            await this._permissionRepository.addPermission(permission)
        } catch (error) {
            throw error
        }
    }
}