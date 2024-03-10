import {inject, singleton} from "tsyringe";
import {IRoleRepository} from "../../../database/interfaces/IRoleRepository";
import {CreateRoleCommand} from "./CreateRoleCommand";
import {ConflictError} from "../../../domain/common/errors";
import {Role} from "../../../domain/role/Role";


@singleton()
export class CreateRoleCommandHandler {

    public constructor(
        @inject("roleRepository") private _roleRepository: IRoleRepository,
    ) {}

    public async execute(request: CreateRoleCommand): Promise<void> {

        const foundRole = await this._roleRepository.getRoleByName(request.name)

        if (foundRole) {
            throw new ConflictError("Role already exists.")
        }

        try {
            const role = Role.create({
                name: request.name
            })

            await this._roleRepository.addRole(role)
        } catch (error) {
            throw error
        }
    }
}