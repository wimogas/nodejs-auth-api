import container from "../../../di";
import {RouterProvider} from "../../../webserver/frameworks/express/routes/RouterProvider";
import GetTokenController from "./GetTokenController";
import {OkResponse} from "../../../webserver/frameworks/express/responses/OkResponse";

export class GetTokenRoute extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.get(
            '/',
            this.handleHTTPRequest(
                container.resolve(GetTokenController),
                OkResponse
            )
        );
    }
}