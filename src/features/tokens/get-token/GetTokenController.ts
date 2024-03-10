import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {GetTokenQueryHandler} from "./GetTokenQueryHandler";
import {GetTokenQuery} from "./GetTokenQuery";
import {logger} from "../../../decorators/logger";

export class GetTokenController implements IController {

    @logger
    public async execute(request: IHTTPRequest): Promise<string>{
        const getTokenQueryHandler = container.resolve(GetTokenQueryHandler)

        const getTokenQuery = new GetTokenQuery(
            request.body.email,
            request.body.password
        )

        return await getTokenQueryHandler.execute(getTokenQuery)
    }
}

