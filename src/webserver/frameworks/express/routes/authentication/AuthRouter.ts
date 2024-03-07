import RegisterInput from "../../inputs/authentication/RegisterInput";
import LoginInput from "../../inputs/authentication/LoginInput";
import {RouterProvider} from "../RouterProvider";
import DeleteUserInput from "../../inputs/authentication/DeleteUserInput";

export class AuthRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {

        this._router.delete(
            '/:id',
            this.handleHTTPRequest(DeleteUserInput)
        );

        this._router.get(
            '/login',
            this.handleHTTPRequest(LoginInput)
        );

        this._router.post(
            '/register',
            this.handleHTTPRequest(RegisterInput)
        );
    }
}