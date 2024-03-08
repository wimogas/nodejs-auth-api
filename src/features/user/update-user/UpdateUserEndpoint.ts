import container from "../../../di";
import {RouterProvider} from "../../../webserver/frameworks/express/routes/RouterProvider";
import UpdateUserController from "./UpdateUserController";
import {NoContentResponse} from "../../../webserver/frameworks/express/responses/NoContentResponse";

export class UpdateUserEndpoint extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.patch(
            '/:id',
            this.handleHTTPRequest(
                container.resolve(UpdateUserController),
                NoContentResponse
            )
        );
    }
}