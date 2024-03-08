import {singleton} from "tsyringe";
import {IHTTPRequest} from "../../../interfaces/IHTTPRequest";
import GetUserQueryHandler from "./GetUserQueryHandler";
import container from '../../../di'
import {GetUserQuery} from "./GetUserQuery";

@singleton()
export default class GetUserController {

    public async execute(request: IHTTPRequest): Promise<string>{
        const getUserQueryHandler = container.resolve(GetUserQueryHandler)

        const getUserQuery = new GetUserQuery(
            request.params.id,
        )

        return await getUserQueryHandler.execute(getUserQuery)
    }
}