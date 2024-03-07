import {AuthRouter} from './authentication/AuthRouter'
import {RouterProvider} from "./RouterProvider";

export default class ApiRouter extends RouterProvider {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.use('/api/v1/auth', new AuthRouter().getRouter());
    }
}