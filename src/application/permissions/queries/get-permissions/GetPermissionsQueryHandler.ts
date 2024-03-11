import {inject, singleton} from "tsyringe";
import {IPermissionRepository, IRoleRepository} from "../../../interfaces";
import {Permission} from "../../../../domain/permission/Permission";
import {NotFoundError} from "../../../../domain/common/errors";

@singleton()
export class GetPermissionsQueryHandler {

    public constructor(
        @inject("permissionRepository") private _permissionRepository: IPermissionRepository,
    ) {}

    public async execute(request: any): Promise<any> {
        const foundPermissions = await this._permissionRepository.getPermissions(request.limit, request.skip)

        if (!foundPermissions) {
            throw new NotFoundError()
        }

        try {

            return foundPermissions.map((perm: any) => {
                return {
                    id: perm._id,
                    name: perm.name,
                }
            })

        } catch (error) {
            throw error
        }
    }
}