import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {GetRoleQueryHandler, GetRoleQuery} from "../../../application/roles";
import {GetRolesQuery} from "../../../application/roles/queries/get-roles/GetRolesQuery";
import {GetRolesQueryHandler} from "../../../application/roles/queries/get-roles/GetRolesQueryHandler";
import {
    GetPermissionsQueryHandler
} from "../../../application/permissions/queries/get-permissions/GetPermissionsQueryHandler";
import {GetPermissionsQuery} from "../../../application/permissions/queries/get-permissions/GetPermissionsQuery";

export class GetPermissionsController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<any>{
        const getPermissionsQueryHandler = container.resolve(GetPermissionsQueryHandler)

        const getPermissionsQuery = new GetPermissionsQuery(
            request.query.limit && request.query.limit,
            request.query.skip && request.query.skip
        )

        return await getPermissionsQueryHandler.execute(getPermissionsQuery)
    }
}

