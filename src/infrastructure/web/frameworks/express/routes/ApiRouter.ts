import {AuthRouter} from './authentication/AuthRouter'
import {RouterBuilder} from "./interfaces/RouterBuilder";

export default class ApiRouter extends RouterBuilder {
    public constructor() {
        super();
        this.init();
    }

    private init(): void {
        this._router.use('/api/v1/auth', new AuthRouter().getRouter());
    }
}