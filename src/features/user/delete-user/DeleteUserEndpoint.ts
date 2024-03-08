import container from "../../../di";
import {RouterProvider} from "../../../webserver/frameworks/express/routes/RouterProvider";
import DeleteUserController from "./DeleteUserController";
import {NoContentResponse} from "../../../webserver/frameworks/express/responses/NoContentResponse";

export class DeleteUserEndpoint extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.delete(
            '/:id',
            this.handleHTTPRequest(
                container.resolve(DeleteUserController),
                NoContentResponse
            )
        );
    }
}