import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {GetRoleQueryHandler, GetRoleQuery} from "../../../application/roles";
import {GetRolesQuery} from "../../../application/roles/queries/get-roles/GetRolesQuery";
import {GetRolesQueryHandler} from "../../../application/roles/queries/get-roles/GetRolesQueryHandler";

export class GetRolesController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<any>{
        const getRolesQueryHandler = container.resolve(GetRolesQueryHandler)

        const getRolesQuery = new GetRolesQuery(
            request.query.limit && request.query.limit,
            request.query.skip && request.query.skip
        )

        return await getRolesQueryHandler.execute(getRolesQuery)
    }
}

