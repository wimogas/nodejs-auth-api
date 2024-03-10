import {inject, singleton} from "tsyringe";
import {IRoleRepository} from "../../../database/interfaces/IRoleRepository";

@singleton()
export class UpdateRoleCommandHandler {

    public constructor(
        @inject("roleRepository") private _roleRepository: IRoleRepository,
    ) {}

    public async execute(request: any): Promise<void> {
        try {
            //check if role exists

            //check if role changes are valid

            //update role
            await this._roleRepository.updateRole(request.id, request.changes)

        } catch (error) {
            throw error
        }
    }
}