import RegisterInput from "../../inputs/authentication/RegisterInput";
import LoginInput from "../../inputs/authentication/LoginInput";
import {RouterProvider} from "../interfaces/RouterProvider";
import container from '../../../../../di'
import AuthMiddleware from "../../middlewares/AuthMiddleware";
export class AuthRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        const authMiddleware = container.resolve(AuthMiddleware)

        this._router.get(
            '/verify', authMiddleware.authenticate,
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