import RegisterInput from "../../inputs/authentication/RegisterInput";
import LoginInput from "../../inputs/authentication/LoginInput";
import authMiddleware from "../../middlewares/AuthMiddleware";
import {RouterBuilder} from "../interfaces/RouterBuilder";

export class AuthRouter extends RouterBuilder {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
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