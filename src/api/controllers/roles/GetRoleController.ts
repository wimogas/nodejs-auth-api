import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {GetRoleQueryHandler, GetRoleQuery} from "../../../application/roles";

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

