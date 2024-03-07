import {RouterProvider} from "../RouterProvider";
import {
    ValidateDeleteUserCommandBehavior
} from "../../../../../authentication/application/common/behaviors/ValidateDeleteUserCommandBehavior";
import {NoContentOutput} from "../../outputs/NoContentOutput";
import {
    ValidateGetLoginTokenQueryBehavior
} from "../../../../../authentication/application/common/behaviors/ValidateGetLoginTokenQueryBehavior";
import {OkOutput} from "../../outputs/OkOutput";
import {
    ValidateCreateUserCommandBehavior
} from "../../../../../authentication/application/common/behaviors/ValidateCreateUserCommandBehavior";
import {CreatedOutput} from "../../outputs/CreatedOutput";

export class AuthRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {

        this._router.delete(
            '/:id',
            this.handleHTTPRequest(
                ValidateDeleteUserCommandBehavior,
                NoContentOutput)
        );

        this._router.get(
            '/login',
            this.handleHTTPRequest(
                ValidateGetLoginTokenQueryBehavior,
                OkOutput
            )
        );

        this._router.post(
            '/register',
            this.handleHTTPRequest(
                ValidateCreateUserCommandBehavior,
                CreatedOutput
            )
        );
    }
}