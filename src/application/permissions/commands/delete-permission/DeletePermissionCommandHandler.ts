import {inject, singleton} from "tsyringe";
import {DeletePermissionCommand} from "./DeletePermissionCommand";
import {IPermissionRepository} from "../../../interfaces";
import {NotFoundError} from "../../../../domain/common/errors";


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