import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {logger} from "../../../infrastructure/services";
import {GetTokenQueryHandler, GetTokenQuery} from "../../../application/tokens";

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

