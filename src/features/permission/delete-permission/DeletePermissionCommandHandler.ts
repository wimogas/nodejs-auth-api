import {inject, singleton} from "tsyringe";
import {IPermissionRepository} from "../../../database/interfaces/IPermissionRepository";
import {DeletePermissionCommand} from "./DeletePermissionCommand";
import {ConflictError, NotFoundError} from "../../../domain/common/errors";
import {Permission} from "../../../domain/permission/Permission";

@singleton()
export class DeletePermissionCommandHandler {

    public constructor(
        @inject("permissionRepository") private _permissionRepository: IPermissionRepository,
    ) {}

    public async execute(command: DeletePermissionCommand): Promise<void> {
        const foundPermission = await this._permissionRepository.getPermissionById(command.id)

        if (!foundPermission) {
            throw new NotFoundError()
        }

        try {
            await this._permissionRepository.deletePermission(command.id)
        } catch (error) {
            throw error
        }
    }
}