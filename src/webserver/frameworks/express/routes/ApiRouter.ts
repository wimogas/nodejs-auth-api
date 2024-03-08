import {UserRouter} from './UserRouter'
import {RouterProvider} from "./RouterProvider";
import {TokenRouter} from "./TokenRouter";

export default class ApiRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.use('/api/v1/user', new UserRouter().getRouter());
        this._router.use('/api/v1/auth', new TokenRouter().getRouter());
    }
}