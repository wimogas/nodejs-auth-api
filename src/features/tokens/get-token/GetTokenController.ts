import {singleton} from "tsyringe";
import container from '../../../di'
import {IHTTPRequest, IController} from "../../../interfaces";
import {GetTokenQueryHandler} from "./GetTokenQueryHandler";
import {GetTokenQuery} from "./GetTokenQuery";

@singleton()
export class GetTokenController implements IController {

    public async execute(request: IHTTPRequest): Promise<string>{
        const getTokenQueryHandler = container.resolve(GetTokenQueryHandler)

        const getTokenQuery = new GetTokenQuery(
            request.body.email,
            request.body.password
        )

        return await getTokenQueryHandler.execute(getTokenQuery)
    }
}

