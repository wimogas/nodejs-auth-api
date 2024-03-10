import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {GetRoleQueryHandler} from "./GetRoleQueryHandler";
import {GetRoleQuery} from "./GetRoleQuery";
import {logger} from "../../../decorators/logger";

export class GetRoleController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<any>{
        const getRoleQueryHandler = container.resolve(GetRoleQueryHandler)

        const getRoleQuery = new GetRoleQuery(
            request.params.id
        )

        return await getRoleQueryHandler.execute(getRoleQuery)
    }
}

