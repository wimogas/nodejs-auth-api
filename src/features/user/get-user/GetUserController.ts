import {IHTTPRequest, IController} from "../../../interfaces";
import {GetUserQueryHandler} from "./GetUserQueryHandler";
import container from '../../../di'
import {GetUserQuery} from "./GetUserQuery";
import {logger} from "../../../decorators/logger";

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