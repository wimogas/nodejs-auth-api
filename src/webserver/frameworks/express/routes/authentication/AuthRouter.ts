import RegisterInput from "../../inputs/authentication/RegisterInput";
import LoginInput from "../../inputs/authentication/LoginInput";
import {RouterProvider} from "../interfaces/RouterProvider";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

export class AuthRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {

        this._router.get(
            '/verify', new AuthMiddleware().authenticate,
            this.handleVerifiedHTTPRequest()
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