import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {GetPermissionQueryHandler, GetPermissionQuery} from "../../../application/permissions";

export class GetPermissionController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<any>{
        const getPermissionQueryHandler = container.resolve(GetPermissionQueryHandler)

        const getPermissionQuery = new GetPermissionQuery(
            request.params.id
        )

        return await getPermissionQueryHandler.execute(getPermissionQuery)
    }
}

