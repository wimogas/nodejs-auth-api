import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {GetUserQueryHandler} from "../../../application/users";
import {GetUserQuery} from "../../../application/users/queries/get-user/GetUserQuery";


export class GetUserController implements IController {
    @logger
    public async execute(request: IHTTPRequest): Promise<string>{
        const getUserQueryHandler = container.resolve(GetUserQueryHandler)

        const getUserQuery = new GetUserQuery(
            request.params.id,
        )

        return await getUserQueryHandler.execute(getUserQuery)
    }
}