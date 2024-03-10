import {inject, singleton} from "tsyringe";
import {IRoleRepository} from "../../../database/interfaces/IRoleRepository";
import {NotFoundError} from "../../../domain/common/errors";
import {PermissionId} from "../../../domain/permission/PermissionId";
import {IPermissionRepository} from "../../../database/interfaces/IPermissionRepository";
import {UpdatePermissionCommand} from "./UpdatePermissionCommand";

@singleton()
export class UpdatePermissionCommandHandler {

    public constructor(
        @inject("permissionRepository") private _permissionRepository: IPermissionRepository,
    ) {}

    public async execute(command: UpdatePermissionCommand): Promise<void> {

        const foundRole = await this._permissionRepository.getPermissionById(command.id)

        if (!foundRole) {
            throw new NotFoundError()
        }

        try {
            await this._permissionRepository.updatePermission(command.id, command.name)

        } catch (error) {
            throw error
        }
    }
}