import {inject, singleton} from "tsyringe";
import {IRoleRepository} from "../../../interfaces";
import {DeleteRoleCommand} from "./DeleteRoleCommand";
import {NotFoundError} from "../../../../domain/common/errors";



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