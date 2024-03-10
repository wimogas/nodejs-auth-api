import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {GetPermissionQueryHandler} from "./GetPermissionQueryHandler";
import {GetPermissionQuery} from "./GetPermissionQuery";
import {logger} from "../../../decorators/logger";

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

