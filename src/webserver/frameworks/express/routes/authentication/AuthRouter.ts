import {RouterProvider} from "../RouterProvider";
import {NoContentResponse} from "../../responses/NoContentResponse";
import {OkResponse} from "../../responses/OkResponse";
import {CreatedResponse} from "../../responses/CreatedResponse";
import AuthenticationController from "../../../../../authentication/api/AuthenticationController";
import {container} from "../../di";

export class AuthRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {

        this._router.delete(
            '/:id',
            this.handleHTTPRequest(
                container.resolve(AuthenticationController).deleteUser,
                NoContentResponse
            )
        );

        this._router.get(
            '/login',
            this.handleHTTPRequest(
                container.resolve(AuthenticationController).getLoginToken,
                OkResponse
            )
        );

        this._router.post(
            '/register',
            this.handleHTTPRequest(
                container.resolve(AuthenticationController).createUser,
                CreatedResponse
            )
        );
    }
}