import container from "../../../di";
import {RouterProvider} from "../../../webserver/frameworks/express/routes/RouterProvider";
import GetUserController from "./GetUserController";
import {OkResponse} from "../../../webserver/frameworks/express/responses/OkResponse";

export class GetUserEndpoint extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.get(
            '/:id',
            this.handleHTTPRequest(
                container.resolve(GetUserController),
                OkResponse
            )
        );
    }
}