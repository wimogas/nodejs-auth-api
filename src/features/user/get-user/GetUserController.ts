import {singleton} from "tsyringe";
import {IHTTPRequest, IController} from "../../../interfaces";
import {GetUserQueryHandler} from "./GetUserQueryHandler";
import container from '../../../di'
import {GetUserQuery} from "./GetUserQuery";

@singleton()
export class GetUserController implements IController {

    public async execute(request: IHTTPRequest): Promise<string>{
        const getUserQueryHandler = container.resolve(GetUserQueryHandler)

        const getUserQuery = new GetUserQuery(
            request.params.id,
        )

        return await getUserQueryHandler.execute(getUserQuery)
    }
}