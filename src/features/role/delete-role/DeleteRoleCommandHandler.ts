import {inject, singleton} from "tsyringe";
import {IRoleRepository} from "../../../database/interfaces/IRoleRepository";
import {DeleteRoleCommand} from "./DeleteRoleCommand";
import {ConflictError, NotFoundError} from "../../../domain/common/errors";
import {Role} from "../../../domain/role/Role";


@singleton()
export class DeleteRoleCommandHandler {

    public constructor(
        @inject("roleRepository") private _roleRepository: IRoleRepository,
    ) {}

    public async execute(request: DeleteRoleCommand): Promise<void> {

        const foundRole = await this._roleRepository.getRoleById(request.id)

        if (!foundRole) {
            throw new NotFoundError()
        }

        try {
            await this._roleRepository.deleteRole(request.id)
        } catch (error) {
            throw error
        }
    }
}