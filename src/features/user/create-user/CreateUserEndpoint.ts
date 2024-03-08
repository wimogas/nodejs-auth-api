import container from "../../../di";
import {RouterProvider} from "../../../webserver/frameworks/express/routes/RouterProvider";
import {CreatedResponse} from "../../../webserver/frameworks/express/responses/CreatedResponse";
import CreateUserController from "./CreateUserController";

export class CreateUserEndpoint extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.post(
            '/',
            this.handleHTTPRequest(
                container.resolve(CreateUserController),
                CreatedResponse
            )
        );
    }
}