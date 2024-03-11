import {inject, singleton} from "tsyringe";
import {IRoleRepository} from "../../../interfaces";
import {ConflictError, NotFoundError} from "../../../../domain/common/errors";
import {PermissionId} from "../../../../domain/permission/PermissionId";

@singleton()
export class UpdateRoleCommandHandler {

    public constructor(
        @inject("roleRepository") private _roleRepository: IRoleRepository,
    ) {}

    public async execute(request: any): Promise<void> {

        const foundRole = await this._roleRepository.getRoleById(request.id)

        if (!foundRole) {
            throw new NotFoundError()
        }

        const foundName = await this._roleRepository.getRoleByName(request.changes.name)

        if (foundName) {
            throw new ConflictError("Role already exists.")
        }

        request.changes.permissions.map((p: string) => PermissionId.create(p))

        try {
            await this._roleRepository.updateRole(request.id, request.changes)

        } catch (error) {
            throw error
        }
    }
}