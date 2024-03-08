import container from '../../../di'
import {IHTTPRequest} from "../../../interfaces/IHTTPRequest";
import GetTokenQueryHandler from "./GetTokenQueryHandler";
import {singleton} from "tsyringe";
import {GetTokenQuery} from "./GetTokenQuery";
@singleton()
export default class GetTokenController {

    public async execute(request: IHTTPRequest): Promise<string>{
        const getTokenQueryHandler = container.resolve(GetTokenQueryHandler)

        const getTokenQuery = new GetTokenQuery(
            request.body.email,
            request.body.password
        )

        return await getTokenQueryHandler.execute(getTokenQuery)
    }
}

