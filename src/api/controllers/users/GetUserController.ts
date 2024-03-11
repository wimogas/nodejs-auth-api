import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {GetUserQueryHandler, GetUserQuery} from "../../../application/users";

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