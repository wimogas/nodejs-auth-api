import {UserRouter, TokenRouter} from './features'
import {RouterBuilder} from "./RouterBuilder";

export class ApiRouter extends RouterBuilder {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.use('/api/v1/user', new UserRouter().getRouter());
        this._router.use('/api/v1/auth', new TokenRouter().getRouter());
    }
}