import {inject, singleton} from "tsyringe";
import {UpdatePermissionCommand} from "./UpdatePermissionCommand";
import {IPermissionRepository} from "../../../interfaces";
import {NotFoundError} from "../../../../domain/common/errors";

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