import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {GetUsersQueryHandler} from "../../../application/users/queries/get-users/GetUsersQueryHandler";
import {GetUsersQuery} from "../../../application/users/queries/get-users/GetUsersQuery";

export class GetUsersController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<any>{
        const getUsersQueryHandler = container.resolve(GetUsersQueryHandler)

        const getUsersQuery = new GetUsersQuery(
            request.query.limit && request.query.limit,
            request.query.skip && request.query.skip
        )

        return await getUsersQueryHandler.execute(getUsersQuery)
    }
}

