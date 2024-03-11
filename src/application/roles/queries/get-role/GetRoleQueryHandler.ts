import {inject, singleton} from "tsyringe";
import {IRoleRepository} from "../../../interfaces";
import {Permission} from "../../../../domain/permission/Permission";

@singleton()
export class GetRoleQueryHandler {

    public constructor(
        @inject("roleRepository") private _roleRepository: IRoleRepository,
    ) {}

    public async execute(request: any): Promise<any> {
        try {
            const foundRole = await this._roleRepository.getRoleById(request.id)

            let permissions = []
            if (foundRole.permissions.length > 0) {
                permissions.push(foundRole.permissions.map((perm: any) => {
                    return  {
                        id: perm._id,
                        name: perm.name
                    }
                }))
            }

            return {
                id: foundRole._id,
                name: foundRole.name,
                permissions: permissions
            }
        } catch (error) {
            throw error
        }
    }
}