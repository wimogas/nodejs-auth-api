import {inject, singleton} from "tsyringe";
import {IRoleRepository} from "../../../interfaces";
import {Permission} from "../../../../domain/permission/Permission";
import {NotFoundError} from "../../../../domain/common/errors";

@singleton()
export class GetRolesQueryHandler {

    public constructor(
        @inject("roleRepository") private _roleRepository: IRoleRepository,
    ) {}

    public async execute(request: any): Promise<any> {
        const foundRoles = await this._roleRepository.getRoles(request.limit, request.skip)

        if (!foundRoles) {
            throw new NotFoundError()
        }

        try {

            return foundRoles.map((role: any) => {
                return {
                    id: role._id,
                    name: role.name,
                    permissions: role.permissions.map((perm: any) => {
                        return {
                            id: perm._id,
                            name: perm.name
                        }
                    })
                }
            })

        } catch (error) {
            throw error
        }
    }
}